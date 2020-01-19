<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const { account, colors, sizes } = await getInitialData(this, session, new Map([
      ['account', '/account'],
      ['colors', '/colors'],
      ['sizes', '/sizes'],
    ]));
    if (account == null || !account.is_admin) {
      this.error(403, 'Create a Product');
    }
    return { account, colors, sizes };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Form from '@/containers/product/edit-form.svelte';
  import PreviewCard from '@/components/product/preview-card.svelte';
  import Button from 'ui/button.svelte';
  import Modal from 'ui/modal.svelte';
  import Dialog from 'ui/dialog.svelte';
  import * as api from '@/utils/api.js';
  import { getBlankProduct, getBlankVariety } from '@/constants/product/blank-product.js';

  const { session } = stores();

  export let colors;
  export let sizes;
  export let account;
  $session.user = account;

  let product = null;
  let warningDialogOpen = false;

  onMount(() => {
    let storedDraft = JSON.parse(localStorage.getItem('product-draft'));
    product = storedDraft || getBlankProduct();
  });

  async function addColor(color) {
    let resp = await api.post('/colors', { data: { value: color } });
    if (resp.status == 200) {
      colors.push({ value: color });
      colors = colors;
    } else {
      console.error(`Color creation failed (${resp.status})`);
    }
  }

  function persistToStorage() {
    localStorage.setItem('product-draft', JSON.stringify(product));
  }

  function changeProductField({ field, value }) {
    product[field] = value;
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
</script>

<svelte:head>
  <title>Create a Product – Innopoints</title>

  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/create-product/main.css" />
  <link rel="stylesheet" href="css/create-product/preview-card.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
</svelte:head>

<Layout>
  <div class="material">
    <h1 class="padded">Create a Product</h1>
    <main class="padded">
      <Form
        {product}
        colors={colors.map(unwrapValue)}
        sizes={sizes.map(unwrapValue)}
        on:new-color={(e) => addColor(e.detail)}
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
          <Button isFilled classname="ml" on:click={() => console.log('implement me')} disabled={!product}>
            create product
          </Button>
        </div>
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
