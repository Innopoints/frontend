<script>
  import { onMount, onDestroy } from 'svelte';
  import { Button } from 'attractions';
  import Notice from 'src/components/common/notice.svelte';

  export let product;
  export let storageKey;
  let savedProduct;

  onMount(function loadFromStorage() {
    savedProduct = JSON.parse(localStorage.getItem(storageKey));
  });

  function deleteSavedProduct() {
    localStorage.removeItem(storageKey);
    savedProduct = null;
  }

  function loadSavedProduct() {
    product.set(savedProduct);
    savedProduct = null;
  }

  let storageDebounce = null;
  const unsubscribe = product.subscribe(function persistToStorage($product) {
    if (typeof localStorage === 'undefined' || savedProduct !== null) {
      return;
    }

    if (storageDebounce != null) {
      clearTimeout(storageDebounce);
    }

    storageDebounce = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify($product));
    }, 1000);
  });
  onDestroy(unsubscribe);

</script>

{#if savedProduct != null}
  <div class="padded">
    <Notice>
      <svg slot="icon" src="static/images/icons/help-circle.svg" />
      <div class="explanation">
        <p>
          You have an unsaved draft
          {#if savedProduct.name != null}("{savedProduct.name}"){/if}
        </p>
        <p>Would you like to continue working on it?</p>
      </div>
      <div class="actions">
        <Button danger on:click={deleteSavedProduct}>no, delete it</Button>
        <Button on:click={loadSavedProduct}>yes, please</Button>
      </div>
    </Notice>
  </div>
{/if}

<style src="../../../../static/css/components/products/new/draft-restore-notice.scss"></style>
