<script>
  import StaffCard from '@/components/projects/view/staff-card.svelte';
  import isModeration from '@/constants/projects/moderation-activity.js';

  export let project;
  export let account;
  export let competences;

  const moderation = $project.activities.find(isModeration);
</script>

<div class="moderators padded">
  {#each $project.moderators as moderator (moderator.email)}
    <StaffCard {moderator} {account} {moderation} {project} {competences} />
  {/each}
</div>

<style src="../../../../static/css/containers/projects/view/staff-cards.scss"></style>
