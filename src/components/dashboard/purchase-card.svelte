<script>
  import Button from 'ui/button.svelte';
  import parseColor from '@/utils/optimal-color';

  export let purchase;
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
        <span class="copy-email">click to copy e-mail</span>
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
    <Button isDanger>
      <svg src="/images/icons/x.svg" class="icon mr" />
      reject
    </Button>
    <Button>
      <svg src="/images/icons/package.svg" class="icon mr" />
      ready for pickup
    </Button>
    <Button>
      <svg src="/images/icons/smile.svg" class="icon mr" />
      delivered
    </Button>
  </div>
</li>
