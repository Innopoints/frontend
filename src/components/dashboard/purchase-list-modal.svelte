<script>
  import { onMount } from 'svelte';
  import { Modal, Dialog, Loading, Button } from 'attractions';
  import PastPurchaseTile from 'src/components/dashboard/past-purchase-tile.svelte';
  import * as api from 'src/utils/api.js';

  export let open = false;

  let purchasePromises = [];
  let pageFetched = null;
  let totalPages = null;

  function updateTotalPages(resp) {
    totalPages = resp.pages;
    return resp;
  }

  onMount(function fetchFirstPage() {
    purchasePromises.push(
      api.json(api.get('/stock_changes')).then(updateTotalPages),
    );
    purchasePromises = purchasePromises;
    pageFetched = 1;
  });

  function requestMore() {
    pageFetched++;
    const query = new Map([['page', pageFetched]]);
    purchasePromises.push(api.json(api.get('/stock_changes', { query })).then(updateTotalPages));
    purchasePromises = purchasePromises;
  }
</script>

<Modal bind:open let:closeCallback>
  <Dialog title="Purchase history" {closeCallback} class="ml mr">
    <div class="scrollable">
      {#each purchasePromises as promise}
        {#await promise}
          <Loading />
        {:then response}
          {#each response.data as purchase}
            <PastPurchaseTile {purchase} />
          {/each}
        {/await}
      {/each}
      {#if pageFetched != null && pageFetched < totalPages}
        <Button class="more" on:click={requestMore}>
          <svg src="static/images/icons/more-horizontal.svg" class="icon mr-2" />
          load more
        </Button>
      {/if}
    </div>
  </Dialog>
</Modal>

<style src="../../../static/css/components/dashboard/purchase-list-modal.scss"></style>
