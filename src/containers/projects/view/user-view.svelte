<script>
  import UserActivityCard from '@/components/projects/view/user-activity-card.svelte';

  export let activities;
  export let competences;
  export let account;
  
  $: activityCards = (
    activities
      .filter(x => !x.internal)
      .map(act => {
        act.applications = act.applications.map(apl => ({...apl, expanded: false}));
        return act;
      })
  );
</script>

<div class="activities user padded">
  {#each activityCards as activity (activity.id)}
    <UserActivityCard
      {activity}
      {competences}
      {account}
      on:apply
      on:take-back-application
    />
  {/each}
</div>
