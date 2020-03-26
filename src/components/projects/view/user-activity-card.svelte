<script>
  import { createEventDispatcher } from 'svelte';
  import Card from 'ui/card.svelte';
  import Dot from 'ui/dot.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Button from 'ui/button.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import s from '@/utils/plural-s.js';
  import { formatDate, formatDateRange } from '@/utils/date-time-format.js';

  export let activity;
  export let competences;
  export let account;

  const dispatch = createEventDispatcher();
</script>

<Card classname="activity user {activity.expanded ? 'expanded' : ''}">
  <div class="title">{activity.name}</div>
  <div class="row info">
    <Labeled icon label="Reward">
      <svg slot="icon" class="icon" src="images/icons/gift.svg" />
      <span class="content">
        {activity.reward_rate * activity.working_hours}
        <svg src="images/innopoint-sharp.svg" />
      </span>
    </Labeled>
    <Labeled icon label="Worktime">
      <svg slot="icon" class="icon" src="images/icons/clock.svg" />
      <span class="content primary">
        {#if activity.fixed_reward}
          as needed
        {:else}
          {activity.working_hours} hour{s(activity.working_hours)}
        {/if}
      </span>
      <span class="content secondary">
        {formatDateRange(activity.timeframe)}
      </span>
    </Labeled>
  </div>
  {#if activity.application_deadline != null}
    <div class="warning">
      <svg class="icon" src="images/icons/alert-circle.svg" />
      {#if new Date(activity.application_deadline) > new Date()}
        Apply before {formatDate(activity.application_deadline)}!
      {:else}
        No more applications accepted.
      {/if}
    </div>
  {/if}
  {#if activity.description}
    <div class="additional description">
      <Labeled icon label="Description">
        <svg slot="icon" class="icon" src="images/icons/align-left.svg" />
        <span class="content">
          {activity.description}
        </span>
      </Labeled>
    </div>
  {/if}
  <div class="additional chips">
    {#each activity.competences as compID (compID)}
      <UnclickableChip
        outline
        value={competences.find(x => x.id === compID).name.toLowerCase()}
      />
    {/each}
  </div>
  {#if activity.applications != null}
    {#if activity.applications.length !== 0}
      <Labeled icon classname="additional volunteers" label="Accepted Volunteers">
        <svg slot="icon" class="icon" src="images/icons/users.svg" />
        <ul class="actual">
          {#each activity.applications as application (application.id)}
            <li>{application.applicant.full_name}</li>
          {/each}
          <strong>
            {#if activity.people_required !== 0}
              {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)} left
            {:else}
              the more, the better
            {/if}
          </strong>
        </ul>
      </Labeled>
    {:else}
      <Labeled icon classname="additional spots" label="Vacant spots">
        <svg slot="icon" class="icon" src="images/icons/users.svg" />
        <span class="content">
          {#if activity.people_required !== 0}
            {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)} left
          {:else}
            the more, the better
          {/if}
        </span>
      </Labeled>
    {/if}
  {/if}
  {#if activity.existing_application != null}
    <div class="additional application" style="display: block;">
      <div class="label">My Application</div>
      <div class="with-icon">
        <svg class="icon" src="images/icons/message-square.svg" />
        <div class="text">
          {activity.existing_application.comment || 'No comment.'}
        </div>
      </div>
      {#if activity.existing_application.status === ApplicationStatuses.APPROVED}
        <div class="with-icon">
          <svg class="icon" src="images/icons/clock.svg" />
          <div class="text">
            {activity.existing_application.actual_hours}
            actual working hour{s(activity.existing_application.actual_hours)}
          </div>
        </div>
      {/if}
    </div>
    <div class="application-status">
      {#if activity.existing_application.status === ApplicationStatuses.PENDING}
        <Dot small pending />
        Your application is pending review.
      {:else if activity.existing_application.status === ApplicationStatuses.REJECTED}
        <Dot small attention />
        Your application is rejected.
      {:else}
        <Dot small active />
        Your application is approved.
      {/if}
    </div>
  {/if}
  <div class="row">
    <Button
      classname="btn-shift expand-card"
      on:click={() => activity.expanded = !activity.expanded}
    >
      <svg class="icon mr chevron" src="images/icons/chevron-down.svg" />
      {#if activity.expanded}
        collapse
      {:else}
        expand
      {/if}
    </Button>
    {#if account != null}
      {#if activity.existing_application != null}
        <Button
          isDanger
          classname="additional"
          on:click={() => dispatch('take-back-application', activity)}
        >
          take back
        </Button>
      {:else}
        <Button
          isFilled
          classname="additional"
          disabled={new Date(activity.application_deadline) < new Date()
                || (activity.vacant_spots === 0 && activity.people_required !== 0)}
          on:click={() => dispatch('apply', activity)}
        >
          apply
        </Button>
      {/if}
    {:else}
      <p class="additional not-logged-in">
        <a href="/login">Log in</a> to apply.
      </p>
    {/if}
  </div>
</Card>
