<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import parseColor from '@/utils/optimal-color';

  export let purchase;

  let dispatch = createEventDispatcher();
  let editing = true;
  let ready = false;

  const setReady = () => {
    ready = true;
    editing = false;
  };
  const copy = () => {
    if (!navigator.clipboard) alert('Browser does not support copying');
    else navigator.clipboard.writeText(purchase.clientEmail);
  };
</script>

<li>
  <div class="product">
    <div class="image" style={'background:' + parseColor(purchase.variety.color)}>
      <img src={purchase.variety.image} alt="" />
    </div>
    <div class="product-info">
      <div class="title">
        {purchase.name}
        <span class="type">{purchase.type}</span>
      </div>
      <time>{purchase.date}</time>
      <div class="purchaser">
        Purchased by {purchase.client}
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
      <Button isDanger on:click={() => dispatch('reject', purchase)}>
        <svg src="/images/icons/x.svg" class="icon mr" />
        reject
      </Button>

      {#if ready}
        <Button on:click={() => editing = false}>
          <svg src="/images/icons/archive.svg" class="icon mr" />
          pending
        </Button>
      {:else}
        <Button on:click={setReady}>
          <svg src="/images/icons/package.svg" class="icon mr" />
          ready for pickup
        </Button>
      {/if}

      <Button on:click={() => dispatch('deliver', purchase)}>
        <svg src="/images/icons/smile.svg" class="icon mr" />
        delivered
      </Button>
    {/if}
  </div>
</li>
