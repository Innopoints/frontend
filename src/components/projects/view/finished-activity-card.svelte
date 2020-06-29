<script>
  import { getContext } from 'svelte';
  import { Card, Chip } from 'attractions';
  import Labeled from '@/components/common/labeled.svelte';
  import EmptyState from '@/components/common/empty-state.svelte';
  import FeedbackTile from '@/components/projects/view/feedback-tile.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import s from '@/utils/plural-s.js';
  import { formatTimeRange } from '@/utils/date-time-format.js';

  export let activity;
  export let competences;
  const review = getContext('review-mode');
  const approvedApplications = activity.applications.filter(
    apl => apl.status === ApplicationStatuses.APPROVED,
  );
</script>

<div class="activity moderated finished">
  <Card>
    <div class="left">
      <header class="title">{activity.name}</header>
      <div class="row">
        <Labeled icon label="Reward">
          <svg slot="icon" class="icon mr" src="images/icons/gift.svg" />
          <span class="content">
            {activity.reward_rate * activity.working_hours}
            <svg class="innopoint" src="images/innopoint-sharp.svg" />
          </span>
        </Labeled>
        <Labeled icon label="Worktime">
          <svg slot="icon" class="icon mr" src="images/icons/clock.svg" />
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
          <svg slot="icon" class="icon mr" src="images/icons/align-left.svg" />
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
    </div>
    <div class="right">
      <header>
        <span class="label">accepted volunteers</span>
      </header>
      {#if approvedApplications.length !== 0}
        <ul>
          {#each approvedApplications as application (application.id)}
            <FeedbackTile {review} {activity} {application} {competences} />
          {/each}
        </ul>
      {:else}
        <EmptyState small text="No applications yet">
          <img src="images/view-project/no-applications.svg" alt="" />
        </EmptyState>
      {/if}
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/view/finalizing-activity-card.scss"></style>
