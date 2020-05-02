<script>
  import { stores } from '@sapper/app';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import PurchaseCard from '@/components/dashboard/purchase-card.svelte';
  import * as api from '@/utils/api.js';
  import StockChangeStatuses from '@/constants/backend/stock-change-statuses.js';

  const { session } = stores();

  export let purchases = [];

  async function setStatus(stockChange, status) {
    try {
      await api.json(api.patch(`/stock_changes/${stockChange.id}/status`, {
        data: { status },
        csrfToken: $session.account.csrf_token,
      }));
      stockChange.status = status;
      if ([StockChangeStatuses.CARRIED_OUT, StockChangeStatuses.REJECTED].includes(status)) {
        purchases = purchases.filter(purchase => purchase.id !== stockChange.id);
      }
      purchases = purchases;  // trigger an update anyways for the new status
    } catch (e) {
      console.error(e);
    }
  }
</script>

<Card classname="card purchases">
  <div class="title">
    <svg src="/images/icons/shopping-bag.svg" class="icon" />
    InnoStore purchases
  </div>
  {#if purchases.length}
    <ul class="purchases-list">
      {#each purchases as purchase (purchase.id)}
        <PurchaseCard {purchase} on:change-status={(e) => setStatus(purchase, e.detail)} />
      {/each}
    </ul>
  {:else}
    <div class="empty small">
      <div class="icon">
        <svg src="/images/icons/smile.svg" />
      </div>
      <div class="title">No pending purchases!</div>
    </div>
  {/if}
  <div class="actions">
    <Button href="/store">see the InnoStore</Button>
  </div>
</Card>
