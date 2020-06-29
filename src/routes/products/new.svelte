<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';
  import { writable } from 'svelte/store';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['colors', '/colors'],
      ['sizes', '/sizes'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Create a Product');
    }

    data.colors = writable(data.colors);
    data.account = session.account;
    return data;
  }
</script>

<script>
  import { onDestroy } from 'svelte';
  import { goto } from '@sapper/app';
  import Layout from 'src/layouts/default.svelte';
  import { Button, H1, H2, SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import ProductForm from 'src/containers/products/new/product-form.svelte';
  import PreviewCard from 'src/components/products/new/preview-card.svelte';
  import * as api from 'src/utils/api.js';
  import { getBlankProduct } from 'src/constants/products/blank-product.js';
  import spaceOnly from 'src/utils/space-only.js';

  export let colors;
  export let sizes;
  export let account;

  let product = writable(getBlankProduct());
  const unsubscribe = product.subscribe(function disableChosenColors($product) {
    colors.update($colors => {
      $colors.forEach(color => color.disabled = false);
      return $colors;
    });
    for (const variety of $product.varieties) {
      if (variety.color != null) {
        colors.update($colors => {
          $colors.find(color => color.value === variety.color).disabled = true;
          return $colors;
        });
      }
    }
  });
  onDestroy(unsubscribe);
  let snackbarContainer = null;

  function clearFields() {
    const oldProduct = $product;
    product.set(getBlankProduct());
    snackbarContainer.showSnackbar({
      props: {
        text: 'All fields cleared',
        action: {
          text: 'undo',
          callback() {
            product.set(oldProduct);
          },
        },
      },
    });
  }

  async function createProduct() {
    if ($product.name == null || spaceOnly($product.name)) {
      snackbarContainer.showSnackbar({ props: { text: 'A product needs a name' } });
      return;
    }

    if (!$product.price || $product.price < 1) {
      snackbarContainer.showSnackbar({ props: { text: 'A product needs a valid price' } });
      return;
    }

    const cleanVarieties = $product.varieties.flatMap(variety => {
      if ($product.sized) {
        return sizes
          .filter(size => variety.sizes[size.value] != null && variety.sizes[size.value] > 0)
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

    if (cleanVarieties.length === 0 || cleanVarieties.every(variety => variety.amount == 0)) {
      snackbarContainer.showSnackbar({
        props: {
          text: 'The product must be in stock at creation',
        },
      });
      return;
    }

    if (cleanVarieties.some(variety => variety.color == null) && cleanVarieties.length > 1) {
      snackbarContainer.showSnackbar({
        props: {
          text: 'Colorless products cannot come in sizes and have more than 1 variety',
        },
      });
      return;
    }

    try {
      await api.json(api.post('/products', {
        data: {
          name: $product.name,
          type: $product.type || null,
          description: $product.description || '',
          price: $product.price,
          varieties: cleanVarieties,
        },
        csrfToken: account.csrf_token,
      }));
      goto('/products');
    } catch (e) {
      snackbarContainer.showSnackbar({ props: { text: 'Couldn\'t save the product' } });
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Create a Product – Innopoints</title>
</svelte:head>

<Layout user={account}>
  <SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT} bind:this={snackbarContainer}>
    <div class="material">
      <H1 class="padded">Create a Product</H1>
      <main class="padded">
        <ProductForm {product} {colors} {sizes} />
        <section class="preview">
          <H2>Preview</H2>
          <PreviewCard {product} />
          <div class="actions">
            <Button danger on:click={clearFields}>
              clear fields
            </Button>
            <Button filled class="ml" on:click={createProduct}>
              create product
            </Button>
          </div>
        </section>
      </main>
    </div>
  </SnackbarContainer>
</Layout>

<style src="../../../static/css/routes/products/new.scss"></style>
