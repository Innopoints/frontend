<script>
  import { createEventDispatcher } from 'svelte';
  import AccordionSection from 'ui/accordion-section.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';

  export let activity;
  export let application;
  export let handlePanelOpen;

  const dispatch = createEventDispatcher();
</script>

<AccordionSection on:panel-open={handlePanelOpen} let:toggle>
  <button slot="handle" class="btn handle round" type="button" on:click={toggle}>
    <svg class="chevron" src="images/icons/chevron-down.svg" />
  </button>
  <div slot="handle" class="name">
    {application.applicant.full_name}
  </div>
  <span slot="handle" class="telegram popover-container">
    {#if application.telegram}
      <span class="username-link">
        @{application.telegram}
      </span>
      <CopyButton text={application.telegram} />
    {:else}
      No Telegram username specified.
    {/if}
  </span>
  <div slot="handle" class="actual-hours">
    {#if !activity.fixed_reward}
      <label class="label">Actual hours</label>
      <TextField
        type="number"
        placeholder="1"
        min={1}
        value={application.actual_hours}
        on:change={(evt) => {
          if (+evt.detail >= 1) {
            dispatch('hours-changed', { application, hours: +evt.detail });
          }
        }}
      />
    {/if}
  </div>
  {#if application.comment}
    <div class="with-icon">
      <svg class="icon" src="images/icons/message-square.svg" />
      <div class="text">
        {application.comment}
      </div>
    </div>
  {/if}
  <Button isOutline classname="report">
    <svg class="icon mr" src="images/icons/edit-3.svg" />
    report performance
  </Button>
</AccordionSection>
