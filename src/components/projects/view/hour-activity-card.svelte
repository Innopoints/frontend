<script>
  import { createEventDispatcher } from 'svelte';
  import Accordion from 'ui/accordion.svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import ApplicationHourTile from '@/components/projects/view/application-hour-tile.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import s from '@/utils/plural-s.js';
  import { formatTimeRange } from '@/utils/date-time-format.js';

  export let account;
  export let activity;
  let hourChanges = new Map();
  // Reactive to trigger a re-render when reports come in
  $: approvedApplications = activity.applications.filter(
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

  function saveChanges() {
    hourChanges.forEach(
      (hours, application) => dispatch('save-hours', { application, hours, activity }),
    );
    hourChanges.clear();
    hourChanges = hourChanges;
  }

  const dispatch = createEventDispatcher();
</script>

<Card classname="activity moderated finalizing">
  <div class="left">
    <header class="title">{activity.name}</header>
    <div class="row">
      <Labeled icon label="Reward">
        <svg slot="icon" class="icon" src="images/icons/gift.svg" />
        <span class="content">
          {activity.reward_rate * activity.working_hours}
          <svg class="innopoint" src="images/innopoint-sharp.svg" />
        </span>
      </Labeled>
      <Labeled icon label="Worktime">
        <svg slot="icon" class="icon" src="images/icons/clock.svg" />
        <span class="content">
          <span class="content primary">
            {#if activity.fixed_reward}
              as needed
            {:else}
              {activity.working_hours} hour{s(activity.working_hours)}
            {/if}
          </span>
          <div class="content secondary">
            {formatTimeRange(activity.timeframe)}
          </div>
        </span>
      </Labeled>
    </div>
    {#if activity.description}
      <Labeled icon label="Description">
        <svg slot="icon" class="icon" src="images/icons/align-left.svg" />
        <span class="description">
          {activity.description}
        </span>
      </Labeled>
    {/if}
    {#if hourChanges.size !== 0}
      <div class="actions">
        <Button isFilled classname="mr" on:click={saveChanges}>
          <svg class="icon mr" src="images/icons/save.svg" />
          save hours
        </Button>
      </div>
    {/if}
  </div>
  <div class="right">
    <header>
      <span class="label">accepted volunteers</span>
    </header>
    {#if approvedApplications.length !== 0}
      <Accordion let:panelController>
        {#each approvedApplications as application (application.id)}
          <ApplicationHourTile
            {account}
            {activity}
            {application}
            handlePanelOpen={panelController}
            on:hours-changed={recordHourChange}
            on:report-performance
          />
        {/each}
      </Accordion>
    {:else}
      <div class="empty">
        <div class="icon">
          <img src="images/view-project/no-applications.svg" alt="" />
        </div>
        <div class="title">No applications</div>
      </div>
    {/if}
  </div>
</Card>
