<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['colors', '/colors'],
      ['sizes', '/sizes'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Create a Product');
    }

    data.account = session.account;
    return data;
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { prefetch, goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import ProductForm from '@/containers/products/new/product-form.svelte';
  import PreviewCard from '@/components/products/preview-card.svelte';
  import Button from 'ui/button.svelte';
  import Modal from 'ui/modal.svelte';
  import Dialog from 'ui/dialog.svelte';
  import * as api from '@/utils/api.js';
  import { getBlankProduct, getBlankVariety } from '@/constants/products/blank-product.js';
  import spaceOnly from '@/utils/space-only.js';

  export let colors;
  export let sizes;
  export let account;

  let product = null;
  let errors = {
    name: false,
    price: false,
  };
  let errorMessage = null;
  let warningDialogOpen = false;

  onMount(() => {
    let storedDraft = JSON.parse(localStorage.getItem('product-draft'));
    product = storedDraft || getBlankProduct();
  });

  let colorDebounce = null;
  function addColor({ detail: color }) {
    if (colors.includes(color)) {
      return;
    }

    if (colorDebounce != null) {
      clearTimeout(colorDebounce);
    }

    colorDebounce = setTimeout(async () => {
      try {
        await api.json(api.post(
          '/colors',
          { data: { value: color }, csrfToken: account.csrf_token },
        ));
        colors.push({ value: color });
        colors = colors;
        colorDebounce = null;
      } catch (e) {
        console.error(e);
      }
    }, 200);
  }

  function persistToStorage() {
    localStorage.setItem('product-draft', JSON.stringify(product));
  }

  function changeProductField({ field, value }) {
    product[field] = value;
    if (errors[field]) {
      errors[field] = false;
    }
    persistToStorage();
  }

  function clearFields() {
    localStorage.removeItem('product-draft');
    product = getBlankProduct();
    warningDialogOpen = false;
  }

  const unwrapValue = (obj) => obj.value;

  function closeWarningDialog() {
    warningDialogOpen = false;
  }

  function createVariety() {
    product.varieties.push(getBlankVariety());
    product = product;
    persistToStorage();
  }

  function removeVariety(e) {
    product.varieties.splice(e.detail, 1);
    product = product;
    persistToStorage();
  }

  function changeVariety(e) {
    const { index, variety } = e.detail;
    product.varieties[index] = variety;
    persistToStorage();
  }

  function addNewFile({ detail }) {
    product.varieties[detail.varietyIndex].images[detail.fileIndex] = `/file/${detail.id}`;
    persistToStorage();
  }

  function deleteFile({ detail }) {
    product.varieties[detail.varietyIndex].images.splice(detail.fileIndex, 1);
    product = product;
    persistToStorage();
  }

  function swapFiles({ detail }) {
    let images = product.varieties[detail.varietyIndex].images;
    let temp = images[detail.oldDraggableIndex];
    images[detail.oldDraggableIndex] = images[detail.newDraggableIndex];
    images[detail.newDraggableIndex] = temp;
    product = product;
    persistToStorage();
  }

  async function createProduct() {
    errorMessage = null;
    prefetch('/products');
    if (!product.name || spaceOnly(product.name)) {
      errors.name = true;
      errorMessage = 'The product needs a non-empty name.';
    }

    if (!product.price || product.price < 1) {
      errors.price = true;
      errorMessage = 'The product needs a valid price.';
    }

    const cleanVarieties = product.varieties.flatMap(variety => {
      if (product.sized) {
        return sizes
          .filter(size => size.value in variety.sizes)
          .map(size => ({
            color: variety.color || null,
            images: variety.images,
            size: size.value,
            amount: variety.sizes[size.value],
          }));
      }
      return {
        color: variety.color || null,
        images: variety.images,
        size: null,
        amount: variety.quantity,
      };
    });

    if (cleanVarieties.length === 0) {
      errorMessage = 'The product must be in stock at creation.';
    }

    if (cleanVarieties.some(variety => variety.color == null) && cleanVarieties.length > 1) {
      errorMessage = 'Colorless products cannot come in sizes and have more than 1 variety.';
    }

    if (errorMessage) {
      return;
    }

    try {
      await api.json(api.post('/products', {
        data: {
          name: product.name,
          type: product.type || null,
          description: product.description || '',
          price: product.price,
          varieties: cleanVarieties,
        },
        csrfToken: account.csrf_token,
      }));
      localStorage.removeItem('product-draft');
      goto('/products');
    } catch (e) {
      errorMessage = JSON.stringify(e.message || e);
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Create a Product – Innopoints</title>

  <link rel="stylesheet" href="/css/bundles/products-new.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/products-id.min.css" />
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
    <h1 class="padded">Create a Product</h1>
    <main class="padded">
      <ProductForm
        {product} {errors}
        colors={colors.map(unwrapValue)}
        sizes={sizes.map(unwrapValue)}
        on:new-color={addColor}
        on:create-variety={createVariety}
        on:remove-variety={removeVariety}
        on:change-variety={changeVariety}
        on:change={(e) => changeProductField(e.detail)}
        on:new-file={addNewFile}
        on:delete-file={deleteFile}
        on:swap-files={swapFiles}
      />
      <section class="preview">
        <h2>Preview</h2>
        <PreviewCard {product} />
        <div class="actions">
          <Button isDanger on:click={() => warningDialogOpen = true} disabled={!product}>
            clear fields
          </Button>
          <Button isFilled classname="ml" on:click={createProduct} disabled={!product}>
            create product
          </Button>
        </div>
        {#if errorMessage != null}
          <p class="error">
            {errorMessage}
          </p>
        {/if}
      </section>
    </main>
  </div>
  <Modal bind:isOpen={warningDialogOpen}>
    <Dialog isDanger title="Warning" closeCallback={closeWarningDialog}>
      <svg slot="icon" src="/images/icons/alert-triangle.svg" class="icon" />
      <div slot="content" class="content">
        <p class="constrain-width">
          You are about to lose all changes to the current product.
          Are you sure you want to proceed?
        </p>
        <div class="actions">
          <Button on:click={closeWarningDialog}>no, wait</Button>
          <Button isFilled isDanger on:click={clearFields}>yes, clear</Button>
        </div>
      </div>
    </Dialog>
  </Modal>
</Layout>
