<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  import { groupByColor } from '@/utils/group-varieties.js';

  export async function preload(page, session) {
    const { unmodifiedProduct, account, colors, sizes } = await getInitialData(this, session, new Map([
      ['unmodifiedProduct', `/products/${page.params.id}`],
      ['account', '/account'],
      ['colors', '/colors'],
      ['sizes', '/sizes'],
    ]));
    if (account == null || !account.is_admin) {
      this.error(403, 'Edit the Product');
    }
    return { unmodifiedProduct, account, colors, sizes };
  }
</script>

<script>
  import { prefetch, goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Form from '@/containers/products/edit-form.svelte';
  import PreviewCard from '@/components/products/preview-card.svelte';
  import Button from 'ui/button.svelte';
  import Modal from 'ui/modal.svelte';
  import Dialog from 'ui/dialog.svelte';
  import * as api from '@/utils/api.js';
  import arraysEqual from '@/utils/arrays-equal.js';
  import { getBlankVariety } from '@/constants/products/blank-product.js';

  export let unmodifiedProduct;
  let product = Object.assign({}, unmodifiedProduct);
  product.sized = unmodifiedProduct.varieties[0].size != null;
  const varietiesByColor = groupByColor(product.varieties);
  product.varieties = [];
  for (let color of varietiesByColor.keys()) {
    let varieties = varietiesByColor.get(color);
    let currentVariety = Object.assign({}, varieties[0]);
    if (product.sized) {
      currentVariety.sizes = { [currentVariety.size]: currentVariety.amount };
    } else {
      currentVariety.quantity = currentVariety.amount;
    }
    delete currentVariety.size;
    delete currentVariety.amount;
    delete currentVariety.purchases;

    for (let i = 1; i < varieties.length; ++i) {
      if (product.sized) {
        currentVariety.sizes[varieties[i].size] = varieties[i].amount;
      }
    }
    product.varieties.push(currentVariety);
  }

  export let colors;
  export let sizes;
  export let account;

  let errors = {
    name: false,
    price: false,
  };
  let errorMessage = null;
  let warningDialogOpen = false;

  async function addColor(color) {
    let resp = await api.post('/colors', { data: { value: color } });
    if (resp.status == 200) {
      colors.push({ value: color });
      colors = colors;
    } else {
      console.error(`Color creation failed (${resp.status})`);
    }
  }

  function changeProductField({ field, value }) {
    product[field] = value;
    if (errors[field]) {
      errors[field] = false;
    }
  }

  function deleteProduct() {
    prefetch('/store');
    warningDialogOpen = false;
    api.del(`/products/${unmodifiedProduct.id}`).then(resp => {
      if (resp.ok) {
        return goto('/store');
      }

      if (resp.status === 400) {
        resp.json().then(message => {
          if ('message' in message) {
            errorMessage = JSON.stringify(message.message);
          } else {
            errorMessage = JSON.stringify(message);
          }
          console.error(message);
        });
      } else {
        errorMessage = 'The universe really wants this product. Try deleting again later.';
        resp.text().then(console.error);
      }
    });
  }

  const unwrapValue = (obj) => obj.value;

  function closeWarningDialog() {
    warningDialogOpen = false;
  }

  function createVariety() {
    product.varieties.push(getBlankVariety());
    product = product;
  }

  function removeVariety(e) {
    product.varieties.splice(e.detail, 1);
    product = product;
  }

  function changeVariety(e) {
    const { index, variety } = e.detail;
    product.varieties[index] = variety;
  }

  function addNewFile({ detail }) {
    product.varieties[detail.varietyIndex].images[detail.fileIndex] = `/file/${detail.id}`;
  }

  function deleteFile({ detail }) {
    product.varieties[detail.varietyIndex].images.splice(detail.fileIndex, 1);
    product = product;
  }

  function swapFiles({ detail }) {
    let images = product.varieties[detail.varietyIndex].images;
    let temp = images[detail.oldDraggableIndex];
    images[detail.oldDraggableIndex] = images[detail.newDraggableIndex];
    images[detail.newDraggableIndex] = temp;
    product = product;
  }

  function computeDiffs(updated, old) {
    const diffs = {
      fields: null,
      varieties: [],
      deletedVarieties: null,
    };

    for (let field of ['name', 'type', 'description', 'price']) {
      if (updated[field] !== old[field]) {
        if (diffs.fields == null) {
          diffs.fields = { [field]: updated[field] };
        } else {
          diffs.fields[field] = updated[field];
        }
      }
    }

    for (let variety of updated.varieties) {
      let corresponding = old.varieties.findIndex(
        candidate => candidate.color === variety.color && candidate.size === variety.size,
      );

      if (corresponding != -1) {
        if (!arraysEqual(variety.images, old.varieties[corresponding].images)
         || variety.amount !== old.varieties[corresponding].amount) {
           variety.id = old.varieties[corresponding].id;
           diffs.varieties.push(variety);
        }
        old.varieties.splice(corresponding, 1);
      } else {
        diffs.varieties.push(variety);
      }
    }
    diffs.deletedVarieties = old.varieties;

    return diffs;
  }

  function saveChanges() {
    prefetch('/store');
    if (!product.name) {
      errors.name = true;
      errorMessage = 'Some fields are not filled out or filled out incorrectly.';
    }

    if (!product.price || product.price < 1) {
      errors.price = true;
      errorMessage = 'Some fields are not filled out or filled out incorrectly.';
    }

    if (!errors.name && !errors.price) {
      let cleanVarieties = [];
      for (let variety of product.varieties) {
        if (product.sized) {
          for (let size of sizes) {
            if (size.value in variety.sizes) {
              cleanVarieties.push({
                color: variety.color || null,
                images: variety.images,
                size: size.value,
                amount: variety.sizes[size.value],
              });
            }
          }
        } else {
          cleanVarieties.push({
            color: variety.color || null,
            images: variety.images,
            size: null,
            amount: variety.quantity,
          });
        }
      }

      if (cleanVarieties.length === 0) {
        errorMessage = 'The product must be in stock at creation.';
        return;
      }
      const modifiedProduct = Object.assign({}, product);
      modifiedProduct.varieties = cleanVarieties;

      const requests = [];
      const diffs = computeDiffs(modifiedProduct, unmodifiedProduct);
      if (diffs.fields != null) {
        requests.push(api.patch(`/products/${unmodifiedProduct.id}`, { data: diffs.fields }));
      }

      for (let variety of diffs.varieties) {
        if ('id' in variety) {
          let id = variety.id;
          delete variety.id;
          requests.push(api.patch(`/products/${unmodifiedProduct.id}/varieties/${id}`, {
            data: variety,
          }));
        } else {
          requests.push(api.post(`/products/${unmodifiedProduct.id}/varieties`, {
            data: variety,
          }));
        }
      }

      for (let variety of diffs.deletedVarieties) {
        requests.push(api.del(`/products/${unmodifiedProduct.id}/varieties/${variety.id}`));
      }

      Promise.all(requests).then(responses => {
        let failedRequest = false;
        for (let resp of responses) {
          if (resp.ok) {
            continue;
          }

          if (resp.status === 400) {
            failedRequest = true;
            resp.json().then(message => {
              if ('message' in message) {
                errorMessage = JSON.stringify(message.message);
              } else {
                errorMessage = JSON.stringify(message);
              }
              console.error(message);
            });
          } else {
            failedRequest = true;
            errorMessage = 'The universe just doesn\'t want this product. Try again later.';
            resp.text().then(console.error);
          }
        }

        if (!failedRequest) {
          goto('/store');
        }
      });
    }
  }
</script>

<svelte:head>
  <title>
    Edit {product.type ? `"${product.name}" ${product.type}` : product.name} – Innopoints
  </title>

  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/create-product/main.css" />
  <link rel="stylesheet" href="css/create-product/preview-card.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <h1 class="padded">Edit {product.type ? `"${product.name}" ${product.type}` : product.name}</h1>
    <main class="padded">
      <Form
        {product} {errors}
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
          <Button isFilled isDanger on:click={() => warningDialogOpen = true} disabled={!product}>
            delete product
          </Button>
          <Button isFilled classname="ml" on:click={saveChanges} disabled={!product}>
            save changes
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
          Are you sure you want to delete this product?
          If you wish to mark it as “out of stock”, please,
          empty out the quantity instead of deleting
          so that it can be brought back later.
          <em class="consequences">This action cannot be undone</em>
        </p>
        <div class="actions">
          <Button on:click={closeWarningDialog}>no, wait</Button>
          <Button isFilled isDanger on:click={deleteProduct}>yes, delete</Button>
        </div>
      </div>
    </Dialog>
  </Modal>
</Layout>