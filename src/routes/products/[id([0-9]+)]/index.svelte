<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const { account, product } = await getInitialData(this, session, new Map([
      ['account', '/account'],
      ['product', `/products/${page.params.id}`],
    ]));
    if (product == null) {
      this.redirect(302, 'store');
    }
    return { account, product };
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Modal from 'ui/modal.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import Dialog from 'ui/dialog.svelte';
  import ImagePreviews from '@/containers/products/image-previews.svelte';
  import ItemContent from '@/containers/products/item-content.svelte';
  import Snackbar from 'ui/snackbar.svelte';
  import getColorPickerStyles from 'ui/utils/color-picker-styles.js';
  import { groupByColor, groupByID } from '@/utils/group-varieties.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import * as api from '@/utils/api.js';

  export let product;
  export let account;

  let selectedColor;
  let selectedVariety = null;
  let selectedQuantity = 1;

  $: productControl = {
    product,
    varietyMap: groupByID(product.varieties),
    varietiesByColor: groupByColor(product.varieties),
    colors: [],  // string array of all colors
    flatImages: [],  // flat array of images in form { url, color }
    coverImage(color) {
      return this.varietiesByColor.get(color)[0].images[0];
    },
    productSized: product.varieties[0].size != null,
    totalPurchases: product.varieties.reduce((acc, variety) => acc + variety.purchases, 0),
  };
  $: {
    productControl.colors = [...productControl.varietiesByColor.keys()];
    for (let color of productControl.colors) {
      for (let image of productControl.varietiesByColor.get(color)[0].images) {
        productControl.flatImages.push({ url: image, color });
      }
    }
    selectedColor = productControl.colors[0];
  }

  let purchaseModalOpen = false;
  let purchaseSuccess;
  let purchaseFailure;

  function updateColor({ detail }) {
    selectedColor = detail;
  }

  function quantityDecrease() {
    if (selectedQuantity > 1) {
      selectedQuantity--;
    }
  }

  function quantityIncrease() {
    if (selectedQuantity < selectedVariety.amount) {
      selectedQuantity++;
    }
  }

  function preparePurchase({ detail }) {
    purchaseSuccess.close();
    purchaseFailure.close();
    selectedVariety = productControl.varietyMap.get(detail.varietyID);
    purchaseModalOpen = true;
  }

  async function confirmPurchase() {
    purchaseModalOpen = false;
    const resp = await api.post(
      `/products/${product.id}/varieties/${selectedVariety.id}/purchase`,
      { data: { amount: selectedQuantity } },
    );
    if (resp.ok) {
      purchaseSuccess.open();
      account.balance -= productControl.product.price * selectedQuantity;
      selectedVariety.amount -= selectedQuantity;
      product = product;
    } else {
      purchaseFailure.open();
      console.error(await resp.json());
    }
  }

  $: fullName = (product.type ? `"${product.name}" ${product.type}` : product.name);
</script>

<svelte:head>
  <title>{fullName} – Innopoints</title>
  <meta name="og:title" content={fullName} />
  <meta name="og:url" content="https://ipts.innopolis.university/products/{product.id}" />
  <meta name="og:description" content={product.description || "Yet another cool item that could be yours!"} />
  {#if productControl.flatImages.length > 0}
    <meta name="og:image" content="{API_HOST_BROWSER + productControl.flatImages[0].url}" />
  {/if}

  <link rel="stylesheet" href="/css/bundles/products-id.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/store.min.css" />
  {#if account}
    {#if account.is_admin}
      <link rel="prefetch" as="style" href="/css/bundles/dashboard.min.css" />
    {:else}
      <link rel="prefetch" as="style" href="/css/bundles/profile.min.css" />
    {/if}
  {/if}
</svelte:head>

<Layout user={account}>
  <div class="material">
    <main class="product">
      <Button href="/store" classname="back">
        <svg src="/images/icons/arrow-left.svg" class="icon" />
        <span>to the InnoStore</span>
      </Button>
      <div class="balance">
        {#if account != null && !account.is_admin}
          You have {account.balance}
          <svg src="/images/innopoint-sharp.svg" class="innopoint" />
        {/if}
      </div>
      <ImagePreviews {productControl} {selectedColor} on:color-change={updateColor} />
      <ItemContent
        {productControl}
        {selectedColor}
        {account}
        on:color-change={updateColor}
        on:purchase={preparePurchase}
      />
    </main>
  </div>
  <Modal bind:isOpen={purchaseModalOpen}>
    <Dialog title="Confirm your purchase" closeCallback={() => purchaseModalOpen = false}>
      <div slot="content" class="purchase">
        <div class="identifier">
          <div class="name">
            {product.name}
          </div>
          {#if product.type}
            <div class="type">
              {product.type}
            </div>
          {/if}
        </div>
        <div class="quantity">
          <Button isRound on:click={quantityDecrease} disabled={selectedQuantity === 1}>
            <svg src="images/icons/minus.svg" class="icon" />
          </Button>
          <TextField
            type="number"
            isNoSpinner
            bind:value={selectedQuantity}
            min={1}
            max={selectedVariety.amount}
          />
          <Button
            isRound
            on:click={quantityIncrease}
            disabled={selectedQuantity === selectedVariety.amount}
          >
            <svg src="images/icons/plus.svg" class="icon" />
          </Button>
        </div>
      </div>
      <div slot="content" class="options">
        {#if selectedVariety.size != null}
          <span class="label size-label">size</span>
          <UnclickableChip small classname="size" value={selectedVariety.size} />
        {/if}
        {#if selectedColor != null}
          <span class="label color-label">color</span>
          <div class="color" style={getColorPickerStyles(selectedColor)} />
        {/if}
      </div>
      <div slot="content" class="actions">
        {#if !isNaN(+selectedQuantity)
          && selectedQuantity >= 1
          && selectedQuantity <= selectedVariety.amount}
          <Labeled label="Your balance">
            <div class="delta-balance">
              <s>
                {account.balance}
                <svg src="images/innopoint-sharp.svg" class="innopoint" />
              </s>
              {account.balance - productControl.product.price * selectedQuantity}
              <svg src="images/innopoint-sharp.svg" class="innopoint" />
            </div>
          </Labeled>
        {:else}
          <div />
        {/if}
        <Button
          isFilled
          disabled={account.balance < productControl.product.price * selectedQuantity}
          on:click={confirmPurchase}
        >
          confirm
        </Button>
      </div>
    </Dialog>
  </Modal>
  <Snackbar bind:this={purchaseSuccess}>
    <div class="text">Purchase successful! Track its status in the profile.</div>
    <Button href="/profile">open profile</Button>
  </Snackbar>
  <Snackbar bind:this={purchaseFailure}>
    <div class="text">Purchase didn't go through. Try again maybe?</div>
  </Snackbar>
</Layout>
