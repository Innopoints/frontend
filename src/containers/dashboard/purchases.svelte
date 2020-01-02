<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import PurchaseCard from '@/components/dashboard/purchase-card.svelte';

  export let purchases = [];
</script>

<Card classname="card purchases">
  <div class="title">
    <svg src="/images/icons/shopping-bag.svg" class="icon" />
    InnoStore purchases
  </div>
  {#if purchases.length}
    <ul class="purchases">
      {#each purchases as purchase (purchase.name + purchase.type)}
        <PurchaseCard {purchase} />
      {/each}
    </ul>
  {:else}
    <div class="empty">
      <svg class="icon" src="/images/icons/smile.svg" />
      <div class="title">No pending purchases!</div>
    </div>
  {/if}
  <div class="actions">
    <Button href="/store">see the InnoStore</Button>
  </div>
</Card>
