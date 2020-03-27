<script>
  import UserActivityCard from '@/components/projects/view/user-activity-card.svelte';

  export let projectStage;
  export let activities;
  export let competences;
  export let account;

  $: activityCards = activities.filter(x => !x.internal);
</script>

<div class="activities user padded">
  {#each activityCards as activity (activity.id)}
    <UserActivityCard
      {activity}
      {competences}
      {account}
      {projectStage}
      on:apply
      on:take-back-application
      on:leave-feeback
      on:read-feedback
    />
  {/each}
</div>
