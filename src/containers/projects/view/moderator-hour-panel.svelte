<script>
  import { createEventDispatcher } from 'svelte';
  import ModeratorHourCard from '@/components/projects/view/moderator-hour-card.svelte';

  export let project;
  const moderation = project.activities.find(act => act.internal && act.name === 'Moderation');

  function getModerationApplication(moderator) {
    return moderation.applications.find(appl => appl.applicant.email === moderator.email);
  }

  function saveHours({ detail }) {
    detail.activity = moderation;
    dispatch('save-hours', detail);
  }

  const dispatch = createEventDispatcher();
</script>

<div class="moderators padded">
  {#each project.moderators as moderator (moderator.email)}
    <ModeratorHourCard
      {moderator}
      projectStage={project.lifetime_stage}
      application={getModerationApplication(moderator)}
      isCreator={moderator.email === project.creator}
      on:hours-changed={saveHours}
    />
  {/each}
</div>
