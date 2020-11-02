<script>
  import { getContext } from 'svelte';
  import { Accordion, Button, Card } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { s } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import ApplicationHourTile from 'src/components/projects/view/application-hour-tile.svelte';
  import ApplicationStatuses from 'src/constants/backend/application-statuses.js';
  import * as api from 'src/utils/api.js';
  import { formatTimeRange } from 'src/utils/date-time-format.js';

  export let account;
  export let activity;
  let hourChanges = new Map();
  let approvedApplications = activity.applications.filter(
    apl => apl.status === ApplicationStatuses.APPROVED,
  );

  function recordHourChange({ detail: { application, hours } }) {
    if (application.actual_hours === hours) {
      hourChanges.delete(application);
    } else {
      hourChanges.set(application, hours);
    }
    hourChanges = hourChanges;
  }

  async function saveHours() {
    const requests = [];
    for (const [application, hours] of hourChanges) {
      requests.push(api.json(api.patch(
        `/projects/${activity.project}/activities/${activity.id}/applications/${application.id}`,
        { data: { actual_hours: hours }, csrfToken: account.csrf_token },
      )).then(() => application.actual_hours = hours));
    }

    try {
      await Promise.all(requests);
      approvedApplications = approvedApplications;
      showSnackbar({ props: { text: 'Updated hours successfully' } });
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t update hours, try reloading the page' } });
      console.error(e);
    }

    hourChanges.clear();
    hourChanges = hourChanges;
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="activity moderated finalizing">
  <Card>
    <div class="left">
      <header class="title">{activity.name}</header>
      <div class="row">
        <Labeled icon label="Reward">
          <svg slot="icon" class="icon mr" src="static/images/icons/gift.svg" />
          <span class="content">
            {activity.reward_rate * activity.working_hours}
            <svg class="innopoint" src="static/images/innopoint-sharp.svg" />
          </span>
        </Labeled>
        <Labeled icon label="Worktime">
          <svg slot="icon" class="icon mr" src="static/images/icons/clock.svg" />
          <span class="content">
            <span class="primary">
              {#if activity.fixed_reward}
                as needed
              {:else}
                {activity.working_hours} hour{s(activity.working_hours)}
              {/if}
            </span>
            <div class="secondary">
              {formatTimeRange(activity.timeframe)}
            </div>
          </span>
        </Labeled>
      </div>
      {#if activity.description}
        <Labeled icon label="Description">
          <svg slot="icon" class="icon mr" src="static/images/icons/align-left.svg" />
          <span class="description">
            {activity.description}
          </span>
        </Labeled>
      {/if}
      {#if hourChanges.size !== 0}
        <div class="actions">
          <Button filled class="mr" on:click={saveHours}>
            <svg class="icon mr" src="static/images/icons/save.svg" />
            save {activity.fixed_reward ? 'work' : 'hours'}
          </Button>
        </div>
      {/if}
    </div>
    <div class="right">
      <header>
        <span class="label">accepted volunteers</span>
      </header>
      {#if approvedApplications.length !== 0}
        <Accordion let:closeOtherPanels>
          {#each approvedApplications as application (application.id)}
            <ApplicationHourTile
              {account}
              {activity}
              {application}
              {hourChanges}
              on:panel-open={closeOtherPanels}
              on:hours-changed={recordHourChange}
            />
          {/each}
        </Accordion>
      {:else}
        <EmptyState small text="No applications">
          <img loading="lazy" src="/images/view-project/no-applications.svg" alt="" />
        </EmptyState>
      {/if}
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/view/finalizing-activity-card.scss"></style>
