<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';
  import isoForURL from 'src/utils/iso-for-url.js';

  const monthGap = 3;  // The amount of months to preload the timeline for

  export async function preload(page, session) {
    let requestedEmail = page.query.user;

    if (session.account == null) {
      this.error(403, 'Profile');
      return;  // you may think we don't need this, but strangely, we do
    }

    const isMe = requestedEmail === session.account.email;
    const allowed = requestedEmail == null || isMe || session.account.is_admin;

    // non-admin requested a different profile
    if (!allowed) {
      this.redirect(302, `/profile`);
    }

    if (requestedEmail == null) {
      requestedEmail = session.account.email;
    }

    const timelineFetchedUntil = new Date();
    timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - monthGap);
    const data = await getInitialData(this, session, new Map([
      ['account', `/accounts/${requestedEmail}`],
      [
        'timeline',
        `/accounts/${requestedEmail}/timeline?start_date=${isoForURL(timelineFetchedUntil)}`,
      ],
      [
        'statistics',
        `/accounts/${requestedEmail}/statistics?start_date=${isoForURL(timelineFetchedUntil)}`,
      ],
      ['notificationSettings', `/accounts/${requestedEmail}/notification_settings`],
      ['competences', '/competences'],
    ]));

    while (data.timeline.data.length === 0 && data.timeline.more) {
      timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - monthGap);
      ({ timeline: data.timeline } = await getInitialData(this, session, new Map([
        [
          'timeline',
          `/accounts/${requestedEmail}/timeline?start_date=${isoForURL(timelineFetchedUntil)}`,
        ],
      ])));
    }

    data.timelineFetchedUntil = timelineFetchedUntil;

    if (data.account == null) {
      this.error(404, 'Profile');
    }

    data.account.csrf_token = session.account.csrf_token;
    return data;
  }
</script>

<script>
  import Info from 'src/containers/profile/info.svelte';
  import { Card, Tabs, SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import Timeline from 'src/containers/profile/timeline.svelte';
  import Statistics from 'src/containers/profile/statistics.svelte';
  import Notifications from 'src/containers/profile/notifications.svelte';
  import * as api from 'src/utils/api.js';
  import tabs from 'src/constants/profile/tabs.js';

  export let account;
  export let timeline;
  export let statistics;
  export let notificationSettings;
  export let timelineFetchedUntil;
  export let competences;

  let timelinePromises = [];
  if (timeline.data.length) {
    timelinePromises.push(new Promise(resolve => resolve(timeline)));
  }

  let activeTab = tabs.timeline;

  function fetchMoreTimeline() {
    const query = new Map([['end_date', isoForURL(timelineFetchedUntil)]]);
    timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - monthGap);
    query.set('start_date', isoForURL(timelineFetchedUntil));
    timelinePromises.push(
      api.get(`/accounts/${account.email}/timeline`, query)
        .then(resp => resp.json())
        .then(json => {
          if (json.data.length === 0) {
            fetchMoreTimeline();
          }
          return json;
        })
        .catch((e) => {
          // Reset the month if the fetch failed
          timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() + 3);
          console.error(e);
        }),
    );
    timelinePromises = timelinePromises;
  }

  async function updateStatistics({ detail: period }) {
    const query = new Map([['start_date', isoForURL(period.getStart(new Date()))]]);
    try {
      statistics = await api.json(api.get(`/accounts/${account.email}/statistics`, query));
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Profile – Innopoints</title>
</svelte:head>

<SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT}>
  <div class="material">
    <Info {account} />
    <Card>
      <Tabs class="tabs" name="nav-tabs" items={Object.values(tabs)} bind:value={activeTab} />
      {#if activeTab === tabs.timeline}
        <Timeline
          {timelinePromises}
          {competences}
          on:more-timeline={fetchMoreTimeline}
        />
      {:else if activeTab === tabs.statistics}
        <Statistics
          {statistics}
          {competences}
          on:period-change={updateStatistics}
        />
      {:else if activeTab === tabs.notifications}
        <Notifications {account} {notificationSettings} />
      {/if}
    </Card>
  </div>
</SnackbarContainer>

<style src="../../static/css/routes/profile.scss"></style>
