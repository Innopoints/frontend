<script>
  import Button from 'ui/button.svelte';
  import parseColor from '@/utils/optimal-color';

  export let purchase;

  const copy = () => {
    if (!navigator.clipboard) alert('Browser does not support copying');
    else navigator.clipboard.writeText(purchase.clientEmail);
  };
  const updateStatus = status => purchase.status = status;
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
          <div class="chip small unclickable size">{purchase.variety.size}</div>
        {/if}
        {#if purchase.variety.color}
          <div class="color" style={'background:' + purchase.variety.color} />
        {/if}
      </div>
    </div>
  </div>
  <div class="actions">
    {#if purchase.status}
      Marked as {purchase.status}
      <Button classname="btn ml" on:click={() => updateStatus(null)}>
        <svg src="/images/icons/edit.svg" class="icon" />
        edit status
      </Button>
    {:else}
      <Button isDanger on:click={() => updateStatus('rejected')}>
        <svg src="/images/icons/x.svg" class="icon mr" />
        reject
      </Button>
      <Button on:click={() => updateStatus('ready for pickup')}>
        <svg src="/images/icons/package.svg" class="icon mr" />
        ready for pickup
      </Button>
      <Button on:click={() => updateStatus('delivered')}>
        <svg src="/images/icons/smile.svg" class="icon mr" />
        delivered
      </Button>
    {/if}
  </div>
</li>
