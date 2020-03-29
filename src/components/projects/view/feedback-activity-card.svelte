<script>
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import FeedbackTile from '@/components/projects/view/feedback-tile.svelte';
  import s from '@/utils/plural-s.js';
  import { formatTimeRange } from '@/utils/date-time-format.js';

  export let activity;
  export let competences;
  export let review = false;
</script>

<Card classname="activity moderated finalizing finished">
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
    <div class="additional chips">
      {#each activity.competences as compID (compID)}
        <UnclickableChip
          outline
          value={competences.find(x => x.id === compID).name.toLowerCase()}
        />
      {/each}
    </div>
  </div>
  <div class="right long">
    <header>
      <span class="label">accepted volunteers</span>
    </header>
    {#if activity.applications.length !== 0}
      <ul>
        {#each activity.applications as application (application.id)}
          <FeedbackTile {review} {activity} {application} on:read-feedback />
        {/each}
      </ul>
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
