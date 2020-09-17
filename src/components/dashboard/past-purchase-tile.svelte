<script>
  import { Popover, Chip } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';
  import { s } from 'attractions/utils';
  import CopyButton from 'src/components/common/copy-button.svelte';
  import StockChangeStatuses from 'src/constants/backend/stock-change-statuses.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';
  import getBackground from 'src/utils/optimal-color.js';
  import { formatTime } from 'src/utils/date-time-format.js';

  export let purchase;
  $: coverURL = (
    purchase.variety.images.length ?
      `${API_HOST_BROWSER}/file/${purchase.variety.images[0]}`
      : 'images/create-product/placeholder.svg'
  );

  const readableStatuses = {
    [StockChangeStatuses.PENDING]: 'pending',
    [StockChangeStatuses.CARRIED_OUT]: 'delivered',
    [StockChangeStatuses.READY_FOR_PICKUP]: 'ready for pickup',
    [StockChangeStatuses.REJECTED]: 'rejected',
  };
</script>

<div class="past-purchase mb-2">
  <div class="product">
    <div class="image" style={getBackground(purchase.variety.color)}>
      <img loading="lazy" src={coverURL} alt="Product cover" />
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
      <div class="status {purchase.status}">
        {readableStatuses[purchase.status]}
      </div>
    </div>
  </div>
</div>

<style src="../../../static/css/components/dashboard/past-purchase-tile.scss"></style>
