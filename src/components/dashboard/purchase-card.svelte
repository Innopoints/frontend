<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import parseColor from '@/utils/optimal-color';
  import { API_HOST } from '@/constants/env.js';
  import StockChangeStatuses from '@/constants/backend/stock-change-statuses.js';

  export let purchase;

  let dispatch = createEventDispatcher();
  let editing = true;

  const copy = () => {
    if (!navigator.clipboard) alert('Browser does not support copying');
    else navigator.clipboard.writeText(purchase.account.email);
  };
</script>

<li>
  <div class="product">
    <div class="image" style={'background:' + parseColor(purchase.variety.color)}>
      <img src={API_HOST + purchase.variety.images[0]} alt="" />
    </div>
    <div class="product-info">
      <div class="title">
        {purchase.product.name}
        <span class="type">{purchase.product.type || ''}</span>
      </div>
      <time>{new Date(purchase.time).toLocaleString()}</time>
      <div class="purchaser">
        {(-purchase.amount)} item{purchase.amount < -1 && 's' || ''} purchased by {purchase.account.full_name}
        <span on:click={copy} class="copy-email">click to copy e-mail</span>
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
      <Button classname="btn ml" on:click={() => editing = true}>
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
