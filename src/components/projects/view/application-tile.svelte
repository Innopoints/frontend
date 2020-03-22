<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import AccordionSection from 'ui/accordion-section.svelte';
  import Button from 'ui/button.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import range from '@/utils/range.js';
  import * as api from '@/utils/api.js';

  export let activity;
  export let application;
  export let handlePanelOpen;
  let report = null;

  onMount(() => {
    report = api.get(
      `/projects/${activity.project}/activities/${activity.id}`
      + `/applications/${application.id}/report_info`,
    ).then(resp => resp.json());
  });

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
  {#if report != null}
    {#await report then reportData}
      <div class="stars">
        {#each [...range(reportData.average_rating)] as _}
          <svg class="star" src="images/icons/star.svg" />
        {/each}
        {#each [...range(5 - reportData.average_rating)] as _}
          <svg class="star off" src="images/icons/star.svg" />
        {/each}
      </div>
      {#if reportData.reports.length !== 0}
        <Button
          on:click={() => dispatch('view-reports', {
            reports: reportData.reports,
            activity: activity,
            applicant: application.applicant,
          })}
        >
          view past reports
        </Button>
      {/if}
    {/await}
  {/if}
  {#if application.comment}
    <div class="with-icon">
      <svg class="icon" src="images/icons/message-square.svg" />
      <div class="text">
        {application.comment}
      </div>
    </div>
  {/if}
  <div class="actions">
    {#if application.status === ApplicationStatuses.PENDING}
      <Button
        isFilled
        classname="mr-2"
        on:click={() => dispatch('application-status-changed', {
          application,
          activity,
          status: ApplicationStatuses.APPROVED,
        })}
      >
        accept
      </Button>
      <Button
        isFilled
        isDanger
        on:click={() => dispatch('application-status-changed', {
          application,
          activity,
          status: ApplicationStatuses.REJECTED,
        })}
      >
        reject
      </Button>
    {:else}
      <Button
        isDanger
        on:click={() => dispatch('application-status-changed', {
          application,
          activity,
          status: ApplicationStatuses.PENDING,
        })}
      >
        back to pending
      </Button>
    {/if}
  </div>
</AccordionSection>
