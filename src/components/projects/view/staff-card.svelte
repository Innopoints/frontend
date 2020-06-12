<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Card, TextField, Button } from 'attractions';
  import Labeled from 'ui/labeled.svelte';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import s from '@/utils/plural-s.js';

  export let account;
  export let moderator;
  export let moderation;
  export let project;

  const review = getContext('review-mode');
  const isCreator = moderator.email === $project.creator.email;
  const application = moderation.applications.find(
    appl => appl.applicant.email === moderator.email,
  );
  let enteredHours = application.actual_hours;

  function dispatchHourChange() {
    if (enteredHours >= 1) {
      application.actual_hours = enteredHours;
      dispatch('hours-changed', { activity: moderation, application, hours: enteredHours });
    }
  }

  const dispatch = createEventDispatcher();
</script>

<Card>
  <div class="name">
    {moderator.full_name}
    {#if isCreator}
      <svg class="star" src="images/icons/star.svg" />
    {/if}
  </div>
  {#if $project.lifetime_stage === ProjectStages.FINALIZING && !review}
    <Labeled class="mt" label="Working hours">
      <form class="edit-hours">
        <TextField
          type="number"
          placeholder="1"
          min={0}
          max={99999}
          bind:value={enteredHours}
        />
        {#if enteredHours !== application.actual_hours}
          <Button
            filled
            disabled={enteredHours < 0}
            on:click={dispatchHourChange}
          >
            <svg class="mr" src="images/icons/check.svg" />
            save
          </Button>
        {/if}
      </form>
    </Labeled>
  {:else}
    <Labeled class="mt" label="Working hours">
      {application.actual_hours} hour{s(application.actual_hours)}
    </Labeled>
    {#if application.feedback != null && !review}
      <Button
        outline
        class="mt"
        on:click={() => dispatch('read-feedback', {
          activity: moderation,
          feedback: application.feedback,
        })}
      >
        read feedback
      </Button>
    {:else if application.applicant.email === account.email && !review}
      <Button
        filled
        class="mt"
        on:click={() => dispatch('leave-feedback', {
          activity: moderation,
          application,
        })}
      >
        leave feedback
      </Button>
    {/if}
  {/if}
</Card>

<style src="../../../../static/css/components/projects/view/staff-card.scss"></style>