<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import entryTypes from '@/constants/backend/timeline-entry-types.js';
  import applicationStatuses from '@/constants/backend/application-statuses.js';
  import projectStages from '@/constants/backend/project-lifetime-stages.js';
  import reviewStatuses from '@/constants/backend/project-review-statuses.js';
  import stockChangeStatuses from '@/constants/backend/stock-change-statuses.js';

  export let type;
  export let entry_time;
  export let payload;
  export let dateFormatter = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    year: 'numeric',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    hour12: false,
  });

  console.log(entry_time);

  const dispatch = createEventDispatcher();
</script>

<div class="entry">
  <div class="icon">
    {#if type === entryTypes.application}
      <svg src="images/icons/file.svg" />
    {:else if type === entryTypes.purchase}
      <svg src="images/icons/shopping-bag.svg" />
    {:else if type === entryTypes.promotion}
      <svg src="images/icons/chevrons-up.svg" />
    {:else if type === entryTypes.project}
      <svg src="images/icons/package.svg" />
    {/if}
  </div>

  <div class="content">
    {#if type === entryTypes.application}
      <div class="lb">Applied for</div>
      <div class="lb">{payload.activity_name} on</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
      <div
        class="status"
        class:bad="{payload.application_status === applicationStatuses.rejected}"
        class:good="{payload.application_status === applicationStatuses.approved}"
      >
        {#if payload.application_status === applicationStatuses.pending}
          application awaiting approval
        {:else if payload.application_status === applicationStatuses.rejected}
          application rejected
        {:else if payload.application_status === applicationStatuses.approved}
          {#if payload.project_stage === projectStages.finished}
            {payload.reward} <svg src="images/innopoint-sharp.svg" class="innopoint" />
            gained{payload.feedback_id == null ? ', leave feedback to claim' : ''}
          {:else}
            application approved
          {/if}
        {/if}
      </div>
      {#if payload.application_status === applicationStatuses.approved
        && payload.project_stage === projectStages.finished
        && payload.feedback_id == null}
        <Button isFilled classname="mt" on:click={() => dispatch('leave-feedback', payload)}>
          leave feedback
        </Button>
      {/if}
    {:else if type === entryTypes.purchase}
      <div class="lb">Purchased the</div>
      <a href="/products/{payload.product_id}" class="lb" rel="prefetch">
        {#if payload.product_type != null}
          "{payload.product_name}" {payload.product_type}
        {:else}
          {payload.product_name}
        {/if}
      </a>
      <div
        class="status"
        class:bad="{payload.stock_change_status === stockChangeStatuses.rejected}"
        class:good="{
          payload.stock_change_status === stockChangeStatuses.carriedOut
          || payload.stock_change_status === stockChangeStatuses.readyForPickup
        }"
      >
        {#if payload.stock_change_status === stockChangeStatuses.pending}
          purchase is on its way to 319
        {:else if payload.stock_change_status === stockChangeStatuses.rejected}
          purchase rejected
        {:else if payload.stock_change_status === stockChangeStatuses.readyForPickup}
          purchase ready for pickup at 319
        {:else if payload.stock_change_status === stockChangeStatuses.carriedOut}
          purchase delivered
        {/if}
      </div>
    {:else if type === entryTypes.promotion}
      <div class="lb">Granted moderator rights on</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
    {:else if type === entryTypes.project}
      <div class="lb">Created the project</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
      {#if payload.review_status != null}
        <div
          class="status"
          class:bad="{payload.review_status === reviewStatuses.rejected}"
          class:good="{payload.review_status === reviewStatuses.approved}"
        >
          {#if payload.review_status === reviewStatuses.pending}
            project awaiting final review
          {:else if payload.review_status === reviewStatuses.rejected}
            activity statistics sent back for corrections
          {:else if payload.review_status === reviewStatuses.approved}
            activities reviewed & approved
          {/if}
        </div>
      {/if}
      {#if payload.review_status === reviewStatuses.rejected}
        <Button isFilled href="/projects/{payload.project_id}" classname="mt">
          make corrections
        </Button>
      {/if}
    {/if}
    <time datetime={entry_time}>
      {dateFormatter.format(new Date(entry_time))}
    </time>
  </div>
</div>
