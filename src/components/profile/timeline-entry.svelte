<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import EntryTypes from '@/constants/backend/timeline-entry-types.js';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';
  import StockChangeStatuses from '@/constants/backend/stock-change-statuses.js';

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

  const dispatch = createEventDispatcher();
</script>

<div class="entry">
  <div class="icon">
    {#if type === EntryTypes.APPLICATION}
      <svg src="images/icons/file.svg" />
    {:else if type === EntryTypes.PURCHASE}
      <svg src="images/icons/shopping-bag.svg" />
    {:else if type === EntryTypes.PROMOTION}
      <svg src="images/icons/chevrons-up.svg" />
    {:else if type === EntryTypes.PROJECT}
      <svg src="images/icons/package.svg" />
    {/if}
  </div>

  <div class="content">
    {#if type === EntryTypes.APPLICATION}
      <div class="lb">Applied for</div>
      <div class="lb">{payload.activity_name} on</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
      <div
        class="status"
        class:bad="{payload.application_status === ApplicationStatuses.REJECTED}"
        class:good="{payload.application_status === ApplicationStatuses.APPROVED}"
      >
        {#if payload.application_status === ApplicationStatuses.PENDING}
          application awaiting approval
        {:else if payload.application_status === ApplicationStatuses.REJECTED}
          application rejected
        {:else if payload.application_status === ApplicationStatuses.APPROVED}
          {#if payload.project_stage === ProjectStages.FINISHED}
            {payload.reward} <svg src="images/innopoint-sharp.svg" class="innopoint" />
            gained{payload.feedback_id == null ? ', leave feedback to claim' : ''}
          {:else}
            application approved
          {/if}
        {/if}
      </div>
      {#if payload.application_status === ApplicationStatuses.APPROVED
        && payload.project_stage === ProjectStages.FINISHED
        && payload.feedback_id == null}
        <Button isFilled classname="mt" on:click={() => dispatch('leave-feedback', payload)}>
          leave feedback
        </Button>
      {/if}
    {:else if type === EntryTypes.PURCHASE}
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
        class:bad="{payload.stock_change_status === StockChangeStatuses.REJECTED}"
        class:good="{
          payload.stock_change_status === StockChangeStatuses.CARRIED_OUT
          || payload.stock_change_status === StockChangeStatuses.READY_FOR_PICKUP
        }"
      >
        {#if payload.stock_change_status === StockChangeStatuses.PENDING}
          purchase is on its way to 319
        {:else if payload.stock_change_status === StockChangeStatuses.REJECTED}
          purchase rejected
        {:else if payload.stock_change_status === StockChangeStatuses.READY_FOR_PICKUP}
          purchase ready for pickup at 319
        {:else if payload.stock_change_status === StockChangeStatuses.CARRIED_OUT}
          purchase delivered
        {/if}
      </div>
    {:else if type === EntryTypes.PROMOTION}
      <div class="lb">Granted moderator rights on</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
    {:else if type === EntryTypes.PROJECT}
      <div class="lb">Created the project</div>
      <a href="/projects/{payload.project_id}" class="lb" rel="prefetch">
        {payload.project_name}
      </a>
      {#if payload.review_status != null}
        <div
          class="status"
          class:bad="{payload.review_status === ReviewStatuses.REJECTED}"
          class:good="{payload.review_status === ReviewStatuses.APPROVED}"
        >
          {#if payload.review_status === ReviewStatuses.PENDING}
            project awaiting final review
          {:else if payload.review_status === ReviewStatuses.REJECTED}
            activity statistics sent back for corrections
          {:else if payload.review_status === ReviewStatuses.APPROVED}
            activities reviewed & approved
          {/if}
        </div>
      {/if}
      {#if payload.review_status === ReviewStatuses.REJECTED}
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
