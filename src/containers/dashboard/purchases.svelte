<script>
  import { stores } from '@sapper/app';
  import { Card, Button } from 'attractions';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import PurchaseCard from 'src/components/dashboard/purchase-card.svelte';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let purchases = [];

  async function setStatus(stockChange, status) {
    try {
      await api.json(api.patch(`/stock_changes/${stockChange.id}/status`, {
        data: { status },
        csrfToken: $session.account.csrf_token,
      }));
      stockChange.status = status;
      purchases = purchases;
    } catch (e) {
      console.error(e);
    }
  }
</script>

<Card class="purchases">
  <div class="title">
    <svg src="static/images/icons/shopping-bag.svg" class="icon" />
    InnoStore purchases
  </div>
  {#if purchases.length}
    <ul class="purchases-list">
      {#each purchases as purchase (purchase.id)}
        <PurchaseCard {purchase} on:change-status={(e) => setStatus(purchase, e.detail)} />
      {/each}
    </ul>
  {:else}
    <EmptyState small text="No pending purchases!">
      <svg src="static/images/icons/smile.svg" class="icon" />
    </EmptyState>
  {/if}
  <div class="actions">
    <Button href="/products">see the InnoStore</Button>
  </div>
</Card>

<style src="../../../static/css/containers/dashboard/purchases.scss"></style>
