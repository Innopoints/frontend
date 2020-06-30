<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';
  import { groupByColor, groupByID } from 'src/utils/product-manipulation.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['product', `/products/${page.params.id}`],
      ['sizes', '/sizes'],
    ]));

    if (data.product == null) {
      this.redirect(302, '/products');
    }

    data.account = session.account;

    // Pre-computed props
    data.product.sized = data.product.varieties[0].size != null;
    data.varietyMap = groupByID(data.product.varieties);
    data.varietiesByColor = groupByColor(data.product.varieties);
    data.totalPurchases = data.product.varieties.reduce(
      (acc, variety) => acc + variety.purchases, 0,
    );
    data.colors = [...data.varietiesByColor.keys()];
    data.sizes = data.sizes.map(sizeObject => sizeObject.value);
    data.flatImages = data.colors.flatMap(color => {
      return data.varietiesByColor.get(color)[0].images.map(id => (
        { url: `${API_HOST_BROWSER}/file/${id}`, color }
      ));
    });

    return data;
  }
</script>

<script>
  import { Button } from 'attractions';
  import ImagePreviews from 'src/containers/products/view/image-previews.svelte';
  import ItemContent from 'src/containers/products/view/item-content.svelte';
  import PurchaseModal from 'src/components/products/view/purchase-modal.svelte';

  export let product;
  export let account;
  export let varietyMap;
  export let varietiesByColor;
  export let totalPurchases;
  export let colors;
  export let sizes;
  export let flatImages;

  let selectedColor = colors[0];

  const purchaseModal = {
    open: false,
    variety: null,
    show({ detail }) {
      purchaseModal.variety = varietyMap.get(detail.varietyID);
      purchaseModal.open = true;
    },
    triggerRerender() {
      product = product;
      account = account;
      varietiesByColor = varietiesByColor;
      totalPurchases++;
    },
  };

  function updateColor({ detail }) {
    selectedColor = detail;
  }

  $: fullName = (product.type ? `"${product.name}" ${product.type}` : product.name);
</script>

<svelte:head>
  <title>{fullName} – Innopoints</title>
  <meta name="og:title" content={fullName} />
  <meta name="og:url" content="https://ipts.innopolis.university/products/{product.id}" />
  <meta name="og:description" content={product.description || "Yet another cool item that could be yours!"} />
  {#if flatImages.length > 0}
    <meta name="og:image" content="{API_HOST_BROWSER + flatImages[0].url}" />
  {/if}
</svelte:head>

<div class="material">
  <Button href="/products" class="back">
    <svg src="static/images/icons/arrow-left.svg" class="icon" />
    <span>to the InnoStore</span>
  </Button>
  <div class="balance">
    {#if account != null && !account.is_admin}
      You have {account.balance}
      <svg src="static/images/innopoint-sharp.svg" class="innopoint" />
    {/if}
  </div>
  <ImagePreviews images={flatImages} bind:selectedColor on:color-change={updateColor} />
  <ItemContent
    {product}
    {varietiesByColor}
    {colors}
    {sizes}
    {totalPurchases}
    bind:selectedColor
    {account}
    on:color-change={updateColor}
    on:purchase={purchaseModal.show}
  />
  <PurchaseModal
    bind:open={purchaseModal.open}
    {product}
    {account}
    variety={purchaseModal.variety}
    on:rerender={purchaseModal.triggerRerender}
  />
</div>

<style src="../../../../static/css/routes/products/view/index.scss"></style>
