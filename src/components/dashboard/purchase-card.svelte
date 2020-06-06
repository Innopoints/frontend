<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Chip, Popover } from 'attractions';
  import { PopoverPositions } from 'attractions/src/popover';
  import CopyButton from '@/components/common/copy-button.svelte';
  import StockChangeStatuses from '@/constants/backend/stock-change-statuses.js';
  import getBackground from '@/utils/optimal-color.js';
  import s from '@/utils/plural-s.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import { formatTime } from '@/utils/date-time-format.js';

  export let purchase;
  $: coverURL = (
    purchase.variety.images.length ?
      API_HOST_BROWSER + purchase.variety.images[0]
      : 'images/create-product/placeholder.svg'
  );

  let markedStatus = null;
  const statusTexts = new Map([
    [StockChangeStatuses.REJECTED, 'rejected'],
    [StockChangeStatuses.READY_FOR_PICKUP, 'ready for pickup'],
    [StockChangeStatuses.CARRIED_OUT, 'delivered'],
  ]);

  function setStatus(status) {
    dispatch('change-status', status);
    if (status !== StockChangeStatuses.PENDING) {
      markedStatus = statusTexts.get(status);
    }
  }

  const dispatch = createEventDispatcher();
</script>

<li>
  <div class="product">
    <div class="image" style="background: {getBackground(purchase.variety.color)}">
      <img src={coverURL} alt="Product cover" />
    </div>
    <div class="product-info">
      <div class="title">
        {purchase.product.name}
        <span class="type">{purchase.product.type || ''}</span>
      </div>
      <time datetime={purchase.time}>{formatTime(purchase.time)}</time>
      <div class="purchaser">
        {(-purchase.amount)} item{s(-purchase.amount)} purchased by {purchase.account.full_name}
        <Popover position={PopoverPositions.TOP}>
          <a href="mailto:{purchase.account.email}">{purchase.account.email}</a>
          <div slot="popover-content">
            <CopyButton text={purchase.account.email} />
          </div>
        </Popover>
      </div>
      <div class="parameters">
        {#if purchase.variety.size}
          <Chip small class="size">{purchase.variety.size}</Chip>
        {/if}
        {#if purchase.variety.color}
          <div class="color" style={'background:' + purchase.variety.color} />
        {/if}
      </div>
    </div>
  </div>
  <div class="actions">
    {#if markedStatus == null}
      {#if purchase.status !== StockChangeStatuses.REJECTED}
        <Button danger on:click={() => setStatus(StockChangeStatuses.REJECTED)}>
          <svg src="images/icons/x.svg" class="mr" />
          reject
        </Button>
      {/if}
      {#if purchase.status !== StockChangeStatuses.PENDING}
        <Button on:click={() => setStatus(StockChangeStatuses.PENDING)}>
          <svg src="images/icons/archive.svg" class="mr" />
          pending
        </Button>
      {/if}
      {#if purchase.status !== StockChangeStatuses.READY_FOR_PICKUP}
        <Button on:click={() => setStatus(StockChangeStatuses.READY_FOR_PICKUP)}>
          <svg src="images/icons/package.svg" class="mr" />
          ready for pickup
        </Button>
      {/if}
      {#if purchase.status !== StockChangeStatuses.CARRIED_OUT}
        <Button on:click={() => setStatus(StockChangeStatuses.CARRIED_OUT)}>
          <svg src="images/icons/smile.svg" class="mr" />
          delivered
        </Button>
      {/if}
    {:else}
      Marked as {markedStatus}
      <Button class="ml" on:click={() => markedStatus = null}>
        <svg src="images/icons/edit.svg" class="mr" />
        edit status
      </Button>
    {/if}
  </div>
</li>

<style src="../../../static/css/components/dashboard/purchase-card.scss"></style>
