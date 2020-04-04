<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';
  import StockChangeStatuses from '@/constants/backend/stock-change-statuses.js';
  import getBackground from '@/utils/optimal-color.js';
  import s from '@/utils/plural-s.js';
  import { API_HOST } from '@/constants/env.js';
  import { formatTime } from '@/utils/date-time-format.js';

  export let purchase;

  let dispatch = createEventDispatcher();
  let editing = purchase.status === StockChangeStatuses.PENDING;
</script>

<li>
  <div class="product">
    <div class="image" style={'background:' + getBackground(purchase.variety.color)}>
      <img src={API_HOST + purchase.variety.images[0]} alt="" />
    </div>
    <div class="product-info">
      <div class="title">
        {purchase.product.name}
        <span class="type">{purchase.product.type || ''}</span>
      </div>
      <time datetime={purchase.time}>{formatTime(purchase.time)}</time>
      <div class="purchaser">
        {(-purchase.amount)} item{s(-purchase.amount)} purchased by {purchase.account.full_name}
        <span class="popover-container">
          <a href="mailto:{purchase.account.email}">{purchase.account.email}</a>
          <CopyButton text={purchase.account.email} />
        </span>
      </div>
      <div class="parameters">
        {#if purchase.variety.size}
          <UnclickableChip small classname="size">{purchase.variety.size}</UnclickableChip>
        {/if}
        {#if purchase.variety.color}
          <div class="color" style={'background:' + purchase.variety.color} />
        {/if}
      </div>
    </div>
  </div>
  <div class="actions">
    {#if !editing}
      Marked as ready for pickup
      <Button classname="ml" on:click={() => editing = true}>
        <svg src="/images/icons/edit.svg" class="icon mr" />
        edit status
      </Button>
    {:else}
      <Button isDanger on:click={() => dispatch('change-status', StockChangeStatuses.REJECTED)}>
        <svg src="/images/icons/x.svg" class="icon mr" />
        reject
      </Button>

      {#if purchase.status == StockChangeStatuses.READY_FOR_PICKUP}
        <Button on:click={() => {dispatch('change-status', StockChangeStatuses.PENDING);}}>
          <svg src="/images/icons/archive.svg" class="icon mr" />
          pending
        </Button>
      {:else}
        <Button on:click={() => {editing = false; dispatch('change-status', StockChangeStatuses.READY_FOR_PICKUP);}}>
          <svg src="/images/icons/package.svg" class="icon mr" />
          ready for pickup
        </Button>
      {/if}

      <Button on:click={() => dispatch('change-status', StockChangeStatuses.CARRIED_OUT)}>
        <svg src="/images/icons/smile.svg" class="icon mr" />
        delivered
      </Button>
    {/if}
  </div>
</li>
