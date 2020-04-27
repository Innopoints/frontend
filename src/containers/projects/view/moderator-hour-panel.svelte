<script>
  import { createEventDispatcher } from 'svelte';
  import ModeratorHourCard from '@/components/projects/view/moderator-hour-card.svelte';

  export let project;
  export let account;
  export let review = false;
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
      {account}
      {review}
      projectStage={project.lifetime_stage}
      application={getModerationApplication(moderator)}
      isCreator={moderator.email === project.creator.email}
      on:hours-changed={saveHours}
      on:leave-feedback={
        ({ detail: application }) =>
          dispatch('leave-feedback', { activity: moderation, application })
      }
      on:read-feedback={
        ({ detail: feedback }) =>
          dispatch('read-feedback', { activity: moderation, feedback })
      }
    />
  {/each}
</div>
