<script>
  import { createEventDispatcher } from 'svelte';
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import s from '@/utils/plural-s.js';

  export let account;
  export let moderator;
  export let projectStage;
  export let application;
  export let isCreator;
  export let review = false;

  let enteredHours = application.actual_hours;

  function dispatchHourChange() {
    if (enteredHours >= 1) {
      dispatch('hours-changed', { application, hours: enteredHours });
      application.actual_hours = enteredHours;
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
  {#if projectStage === ProjectStages.FINALIZING && !review}
    <Labeled classname="mt" label="Working hours">
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
            isRound
            disabled={enteredHours < 0}
            on:click={dispatchHourChange}
          >
            <svg class="icon" src="images/icons/check.svg" />
          </Button>
        {/if}
      </form>
    </Labeled>
  {:else}
    <Labeled classname="mt" label="Working hours">
      {application.actual_hours} hour{s(application.actual_hours)}
    </Labeled>
    {#if application.feedback != null && !review}
      <Button
        isOutline
        classname="mt"
        on:click={() => dispatch('read-feedback', application.feedback)}
      >
        read feedback
      </Button>
    {:else if application.applicant.email === account.email && !review}
      <Button isFilled classname="mt" on:click={() => dispatch('leave-feedback', application)}>
        leave feedback
      </Button>
    {/if}
  {/if}
</Card>
