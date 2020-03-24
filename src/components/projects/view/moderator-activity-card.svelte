<script>
  import { createEventDispatcher } from 'svelte';
  import Accordion from 'ui/accordion.svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import ApplicationTile from '@/components/projects/view/application-tile.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import s from '@/utils/plural-s.js';
  import { formatDate, formatTimeRange } from '@/utils/date-time-format.js';

  export let activity;
  export let competences;
  let pendingApplications;

  $: pendingApplications = (
    activity.applications == null ?
    [] : activity.applications.filter(x => x.status === ApplicationStatuses.PENDING)
  );
  $: approvedApplications = (
    activity.applications == null ?
    [] : activity.applications.filter(x => x.status === ApplicationStatuses.APPROVED)
  );

  const dispatch = createEventDispatcher();
</script>

<Card classname="activity moderated">
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
    {#if activity.application_deadline != null}
      <div class="warning">
        <svg class="icon" src="images/icons/alert-circle.svg" />
        {#if new Date(activity.application_deadline) > new Date()}
          Deadline: {formatDate(activity.application_deadline)}!
        {:else}
          No more applications accepted.
        {/if}
      </div>
    {/if}
    {#if activity.description}
      <Labeled icon label="Description">
        <svg slot="icon" class="icon" src="images/icons/align-left.svg" />
        <span class="description">
          {activity.description}
        </span>
      </Labeled>
    {/if}
    <div class="additional chips">
      {#each activity.competences as compID (compID)}
        <UnclickableChip
          outline
          value={competences.find(x => x.id === compID).name.toLowerCase()}
        />
      {/each}
    </div>
    <div class="actions">
      <Button isOutline classname="mr" on:click={() => dispatch('edit-activity')}>
        <svg class="icon mr" src="images/icons/edit.svg" />
        edit
      </Button>
      <Button
        isOutline
        classname="mr"
        on:click={() => dispatch('duplicate-activity', activity)}
      >
        <svg class="icon mr" src="images/icons/copy.svg" />
        copy
      </Button>
      <Button
        isOutline
        isDanger
        classname="mr"
        on:click={() => dispatch('delete-activity', activity)}
      >
        <svg class="icon mr" src="images/icons/trash-2.svg" />
        delete
      </Button>
    </div>
  </div>
  <div class="middle">
    <header>
      <span class="label">pending applications</span>
      {#if activity.people_required === 0}
        the more, the better
      {:else}
        {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)}
      {/if}
    </header>
    {#if pendingApplications.length !== 0}
      <Accordion let:panelController>
        {#each pendingApplications as application (application.id)}
          <ApplicationTile
            {activity}
            {application}
            handlePanelOpen={panelController}
            on:view-reports
            on:application-status-changed
          />
        {/each}
      </Accordion>
    {:else}
      <div class="empty">
        <div class="icon">
          <img src="images/view-project/no-applications.svg" alt="" />
        </div>
        <div class="title">No applications yet</div>
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
          <ApplicationTile
            {activity}
            {application}
            handlePanelOpen={panelController}
            on:view-reports
            on:application-status-changed
          />
        {/each}
      </Accordion>
    {:else}
      <div class="empty">
        <div class="icon">
          <img src="images/view-project/no-applications.svg" alt="" />
        </div>
        <div class="title">No applications yet</div>
      </div>
    {/if}
  </div>
</Card>
