<script>
  import { createEventDispatcher } from 'svelte';
  import AccordionSection from 'ui/accordion-section.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';

  export let account;
  export let activity;
  export let application;
  export let handlePanelOpen;
  $: report = application.reports.find(report => report.reporter_email === account.email);

  const dispatch = createEventDispatcher();
</script>

<AccordionSection on:panel-open={handlePanelOpen} let:toggle>
  <button
    slot="handle"
    class="btn handle round"
    type="button"
    on:click={toggle}
    disabled={!application.comment && report != null}
  >
    {#if report == null}
      <div class="badge">
        <svg class="chevron" src="images/icons/chevron-down.svg" />
      </div>
    {:else}
      <svg class="chevron" src="images/icons/chevron-down.svg" />
    {/if}
  </button>
  <div slot="handle" class="name">
    {application.applicant.full_name}
  </div>
  <span slot="handle" class="telegram popover-container">
    {#if application.telegram}
      <a href="https://t.me/{application.telegram}" target="_blank">
        @{application.telegram}
      </a>
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
        min={0}
        max={99999}
        value={application.actual_hours}
        on:change={(evt) => {
          if (+evt.detail >= 0) {
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
  {#if report == null}
    <Button
      isOutline
      classname="report"
      on:click={() => dispatch('report-performance', { activity, application })}
    >
      <svg class="icon mr" src="images/icons/edit-3.svg" />
      report performance
    </Button>
  {/if}
</AccordionSection>
