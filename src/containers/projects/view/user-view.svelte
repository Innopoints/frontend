<script>
  import UserActivityCard from 'src/components/projects/view/user-activity-card.svelte';

  export let account;
  export let competences;
  export let project;
  $: visibleActivities = $project.activities.filter(act => !act.internal && !act.draft);
</script>

<div class="activity-list padded">
  {#each visibleActivities as activity (activity.id)}
    <UserActivityCard {activity} {competences} {account} projectStage={$project.lifetime_stage} />
  {/each}
</div>

<style src="../../../../static/css/containers/projects/view/user-view.scss"></style>
