<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  import isoForURL from '@/utils/iso-for-url.js';

  export async function preload(page, session) {
    let requestedEmail = page.query.user;

    if (session.account == null) {
      this.error(403, 'Profile');
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

    let timelineFetchedUntil = new Date();
    timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - 3);
    const data = await getInitialData(this, session, new Map([
      ['account', `/accounts/${requestedEmail}`],
      ['timeline', `/accounts/${requestedEmail}/timeline?start_date=${isoForURL(timelineFetchedUntil)}`],
      ['statistics', `/accounts/${requestedEmail}/statistics?start_date=${isoForURL(timelineFetchedUntil)}`],
      ['notificationSettings', `/accounts/${requestedEmail}/notification_settings`],
      ['competences', '/competences'],
    ]));

    data.timelineFetchedUntil = timelineFetchedUntil;
    data.account.csrf_token = session.account.csrf_token;

    if (data.account == null) {
      this.error(404, 'Profile');
    }

    return data;
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Info from '@/containers/profile/info.svelte';
  import Tabs from 'ui/tabs.svelte';
  import Timeline from '@/containers/profile/timeline.svelte';
  import Statistics from '@/containers/profile/statistics.svelte';
  import Notifications from '@/containers/profile/notifications.svelte';
  import LeaveFeedbackModal from '@/components/projects/view/leave-feedback-modal.svelte';
  import ReclaimInnopointsModal from '@/components/profile/reclaim-innopoints-modal.svelte';
  import * as api from '@/utils/api.js';
  import tabs from '@/constants/profile/tabs.js';

  const { session } = stores();

  export let account;
  export let timeline;
  export let statistics;
  export let notificationSettings;
  export let timelineFetchedUntil;
  export let competences;

  const leaveFeedbackModal = {
    open: false,
    activity: null,
    application: null,
    payload: null,
    async show({ detail: timelinePayload }) {
      try {
        leaveFeedbackModal.payload = timelinePayload;
        const project = await api.json(api.get(`/projects/${timelinePayload.project_id}`));
        leaveFeedbackModal.activity = project.activities.find(
          act => act.id === timelinePayload.activity_id,
        );
        leaveFeedbackModal.application = leaveFeedbackModal.activity.applications.find(
          apl => apl.id === timelinePayload.application_id,
        );
        leaveFeedbackModal.open = true;
      } catch (e) {
        console.error(e);
      }
    },
    async submitFeedback({ detail }) {
      try {
        const { value, activity, application } = detail;
        value.answers = value.answers.map(answer => answer || '');
        application.feedback = await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}`
          + `/applications/${application.id}/feedback`,
          { data: value, csrfToken: account.csrf_token },
        ));
        leaveFeedbackModal.payload.feedback_id = application.id;
        timelinePromises = timelinePromises;
        account.balance += leaveFeedbackModal.payload.reward;
        leaveFeedbackModal.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  const reclaimInnopointsModal = {
    open: false,
    error: null,
    show() {
      reclaimInnopointsModal.open = true;
    },
    async reclaimInnopoints({ detail }) {
      try {
        const resp = await api.post(
          '/reclaim-innopoints',
          { data: detail, csrfToken: account.csrf_token },
        );

        if (resp.status === 403) {
          reclaimInnopointsModal.error = 'Incorrect username or password.';
        } else if (!resp.ok) {
          reclaimInnopointsModal.error = 'Something went wrong.';
        } else {
          account.balance += await resp.json();
          reclaimInnopointsModal.error = null;
          reclaimInnopointsModal.open = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
  };

  let timelinePromises = [];
  if (timeline.data.length) {
    timelinePromises.push(new Promise(resolve => resolve(timeline)));
  }

  let activeTab = tabs.timeline;

  async function changeUsername({ detail }) {
    try {
      await api.json(api.patch(`/accounts/${account.email}/telegram`, {
        data: { telegram_username: detail },
        csrfToken: account.csrf_token,
      }));
      account.telegram_username = detail;
      $session.account = account;
    } catch (e) {
      console.error(e);
    }
  }

  function capitalize(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  function fetchMoreTimeline() {
    let queryString = '?end_date=' + isoForURL(timelineFetchedUntil);
    timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() - 3);
    queryString += '&start_date=' + isoForURL(timelineFetchedUntil);
    timelinePromises.push(
      api.get(`/accounts/${account.email}/timeline${queryString}`)
        .then(resp => resp.json())
        .then(json => {
          if (json.data.length === 0) {
            fetchMoreTimeline();
          }
          return json;
        })
        .catch((error) => {
          // Reset the month if the fetch failed
          timelineFetchedUntil.setMonth(timelineFetchedUntil.getMonth() + 3);
          throw error;
        }),
    );
    timelinePromises = timelinePromises;
  }

  function openCreateReport({ detail: period }) {
    console.log(period);
  }

  function updateStatistics({ detail: period }) {
    api.get(`/accounts/${account.email}/statistics?start_date=${isoForURL(period.getStart(new Date()))}`)
      .then(resp => resp.json())
      .then(data => statistics = data);
  }
</script>

<svelte:head>
  <title>Profile – Innopoints</title>

  <link rel="stylesheet" href="/css/bundles/profile.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/store.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects-id.min.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <Info
      {account}
      on:username-change={changeUsername}
      on:reclaim-opened={reclaimInnopointsModal.show}
    />
    <section class="card">
      <Tabs
        items={Object.keys(tabs)}
        labels={Object.keys(tabs).map(capitalize)}
        value={activeTab}
        name="nav-tabs"
        on:change={(e) => activeTab = e.detail}
      />
      {#if activeTab === tabs.timeline}
        <Timeline
          {timelinePromises}
          on:more-timeline={fetchMoreTimeline}
          on:leave-feedback={leaveFeedbackModal.show}
        />
      {:else if activeTab === tabs.statistics}
        <Statistics
          {statistics}
          {competences}
          on:period-change={updateStatistics}
          on:create-report={openCreateReport}
        />
      {:else if activeTab === tabs.notifications}
        <Notifications {account} {notificationSettings} />
      {/if}
    </section>
  </div>
  <LeaveFeedbackModal
    bind:isOpen={leaveFeedbackModal.open}
    activity={leaveFeedbackModal.activity}
    application={leaveFeedbackModal.application}
    {competences}
    on:submit={leaveFeedbackModal.submitFeedback}
  />
  <ReclaimInnopointsModal
    bind:isOpen={reclaimInnopointsModal.open}
    error={reclaimInnopointsModal.error}
    on:submit={reclaimInnopointsModal.reclaimInnopoints}
  />
</Layout>
