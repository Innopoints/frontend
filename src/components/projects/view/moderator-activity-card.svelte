<script>
  import { createEventDispatcher } from 'svelte';
  import { Accordion, Button, Card, Chip } from 'attractions';
  import { s } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import Notice from 'src/components/common/notice.svelte';
  import ApplicationTile from 'src/components/projects/view/application-tile.svelte';
  import ApplicationStatuses from 'src/constants/backend/application-statuses.js';
  import { formatDate, formatDateRange } from 'src/utils/date-time-format.js';

  export let activity;
  export let competences;

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

<div class="activity moderated">
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
              {formatDateRange(activity.timeframe)}
            </div>
          </span>
        </Labeled>
      </div>
      {#if activity.application_deadline != null}
        <Notice warning>
          <svg slot="icon" src="static/images/icons/alert-circle.svg" />
          {#if activity.application_deadline > new Date()}
            Deadline: {formatDate(activity.application_deadline)}!
          {:else}
            No more applications accepted.
          {/if}
        </Notice>
      {/if}
      {#if activity.description}
        <Labeled icon label="Description">
          <svg slot="icon" class="icon mr" src="static/images/icons/align-left.svg" />
          <span class="description">
            {activity.description}
          </span>
        </Labeled>
      {/if}
      <div class="additional chips">
        {#each activity.competences as compID (compID)}
          <Chip small outline>{competences.find(x => x.id === compID).name.toLowerCase()}</Chip>
        {/each}
      </div>
      <div class="actions">
        <Button
          outline
          class="mr"
          on:click={() => dispatch('edit', activity)}
        >
          <svg class="icon mr" src="static/images/icons/edit.svg" />
          edit
        </Button>
        <Button outline class="mr" on:click={() => dispatch('copy', activity)}>
          <svg class="icon mr" src="static/images/icons/copy.svg" />
          copy
        </Button>
        <Button outline danger class="mr" on:click={() => dispatch('delete', activity)}>
          <svg class="icon mr" src="static/images/icons/trash-2.svg" />
          delete
        </Button>
      </div>
    </div>
    <div class="middle">
      <header>
        <span class="label">pending applications</span>
        {#if activity.people_required == null}
          the more, the better
        {:else}
          {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)}
        {/if}
      </header>
      {#if pendingApplications.length !== 0}
        <Accordion let:closeOtherPanels>
          {#each pendingApplications as application (application.id)}
            <ApplicationTile
              {activity}
              {application}
              on:rerender={() => activity = activity}
              on:panel-open={closeOtherPanels}
            />
          {/each}
        </Accordion>
      {:else}
        <EmptyState small text="No applications yet">
          <img src="/images/view-project/no-applications.svg" alt="" />
        </EmptyState>
      {/if}
    </div>
    <div class="right">
      <header>
        <span class="label">accepted volunteers</span>
      </header>
      {#if approvedApplications.length !== 0}
        <Accordion let:closeOtherPanels>
          {#each approvedApplications as application (application.id)}
            <ApplicationTile
              {activity}
              {application}
              on:rerender={() => activity = activity}
              on:panel-open={closeOtherPanels}
            />
          {/each}
        </Accordion>
      {:else}
        <EmptyState small text="No applications yet">
          <img src="/images/view-project/no-applications.svg" alt="" />
        </EmptyState>
      {/if}
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/view/moderator-activity-card.scss"></style>
