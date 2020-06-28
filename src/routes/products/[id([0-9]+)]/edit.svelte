<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  import { prepareAfterBackend, copyProduct } from '@/utils/product-manipulation.js';
  import { writable } from 'svelte/store';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['unmodifiedProduct', `/products/${page.params.id}`],
      ['colors', '/colors'],
      ['sizes', '/sizes'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Edit the Product');
    }

    data.product = writable(prepareAfterBackend(copyProduct(data.unmodifiedProduct)));
    data.colors = writable(data.colors);
    data.account = session.account;
    return data;
  }
</script>

<script>
  import { onDestroy } from 'svelte';
  import { goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import { Button, H1, H2, SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import ProductForm from '@/containers/products/new/product-form.svelte';
  import PreviewCard from '@/components/products/new/preview-card.svelte';
  import DangerConfirmDialog from '@/components/common/danger-confirm-dialog.svelte';
  import * as api from '@/utils/api.js';
  import spaceOnly from '@/utils/space-only.js';
  import { computeDiffs } from '@/utils/product-manipulation.js';

  export let unmodifiedProduct;
  export let product;
  export let colors;
  export let sizes;
  export let account;

  const unsubscribe = product.subscribe(function disableChosenColors($product) {
    colors.update($colors => {
      $colors.forEach(color => color.disabled = false);
      return $colors;
    });
    for (let variety of $product.varieties) {
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

  const deleteProductWarning = {
    open: false,
    show() {
      deleteProductWarning.open = true;
    },
    async confirm() {
      deleteProductWarning.open = false;
      try {
        await api.json(api.del(`/products/${$product.id}`, { csrfToken: account.csrf_token }));
        goto('/products');
      } catch (e) {
        snackbarContainer.showSnackbar({
          props: {
            text: 'The universe really wants this product, try deleting again later',
          },
        });
        console.error(e);
      }
    },
  };

  async function saveChanges() {
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

    if (cleanVarieties.some(variety => variety.color == null) && cleanVarieties.length > 1) {
      snackbarContainer.showSnackbar({
        props: {
          text: 'Colorless products cannot come in sizes and have more than 1 variety',
        },
      });
      return;
    }

    const modifiedProduct = Object.assign({}, $product);
    modifiedProduct.varieties = cleanVarieties;

    const requests = [];
    const diffs = computeDiffs(modifiedProduct, unmodifiedProduct);
    if (diffs.fields != null) {
      requests.push(api.json(api.patch(
        `/products/${$product.id}`,
        { data: diffs.fields, csrfToken: account.csrf_token },
      )));
    }

    for (let newVariety of diffs.newVarieties) {
      requests.push(api.json(api.post(
        `/products/${$product.id}/varieties`,
        { data: newVariety, csrfToken: account.csrf_token },
      )));
    }

    for (let modifiedVariety of diffs.modifiedVarieties) {
      const id = modifiedVariety.id;
      delete modifiedVariety.id;
      requests.push(api.json(api.patch(
        `/products/${$product.id}/varieties/${id}`,
        { data: modifiedVariety, csrfToken: account.csrf_token },
      )));
    }

    for (let deletedVariety of diffs.deletedVarieties) {
      requests.push(api.json(api.del(
        `/products/${$product.id}/varieties/${deletedVariety.id}`,
        { csrfToken: account.csrf_token },
      )));
    }

    try {
      await Promise.all(requests);
      goto(`/products/${$product.id}`);
    } catch (e) {
      snackbarContainer.showSnackbar({
        props: {
          text: 'Couldn\'t apply all changes, reload the page to investigate',
        },
      });
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>
    Edit {$product.type ? `"${$product.name}" ${$product.type}` : $product.name} – Innopoints
  </title>
</svelte:head>

<Layout user={account}>
  <SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT} bind:this={snackbarContainer}>
    <div class="material">
      <H1 class="padded">
        Edit {$product.type ? `"${$product.name}" ${$product.type}` : $product.name}
      </H1>
      <main class="padded">
        <ProductForm {product} {colors} {sizes} />
        <section class="preview">
          <H2>Preview</H2>
          <PreviewCard {product} />
          <div class="actions">
            <Button filled danger on:click={deleteProductWarning.show}>
              delete product
            </Button>
            <Button filled class="ml" on:click={saveChanges}>
              save changes
            </Button>
          </div>
          <DangerConfirmDialog
            textYes="yes, delete"
            bind:open={deleteProductWarning.open}
            on:confirm={deleteProductWarning.confirm}
          >
            Are you sure you want to delete this product? <br />
            If you wish to mark it as “out of stock”, please,
            empty out the quantity instead of deleting
            so that it can be brought back later.
            <em class="consequences">This action cannot be undone</em>
          </DangerConfirmDialog>
        </section>
      </main>
    </div>
  </SnackbarContainer>
</Layout>

<style src="../../../../static/css/routes/products/new.scss"></style>
