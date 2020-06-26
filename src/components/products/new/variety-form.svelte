<script>
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import {
    Button,
    Label,
    TextField,
  } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ColorPicker from '@/components/products/new/color-picker.svelte';
  import ImageInput from '@/components/products/new/image-input.svelte';
  import { getBlankVariety } from '@/constants/products/blank-product.js';

  export let product;
  export let variety;
  export let colors;
  export let sizes;
  export let showSizes;

  const varietyColor = writable(variety.color);
  setContext('variety-color', varietyColor);

  function updateProduct() {
    $product = $product;
  }

  async function removeVariety() {
    const currentIndex = $product.varieties.findIndex(thatVariety => thatVariety === variety);
    const savedVariety = $product.varieties.splice(currentIndex, 1)[0];
    if ($product.varieties.length === 0) {
      $product.varieties.push(getBlankVariety());
    }
    $product.varieties = $product.varieties;

    showSnackbar({
      props: {
        text: 'Variety deleted',
        action: {
          text: 'undo',
          callback() {
            $product.varieties.splice(currentIndex, 0, savedVariety);
            $product.varieties = $product.varieties;
          },
        },
      },
    });
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<li class="variety">
  <div class="settings">
    <ColorPicker
      {colors}
      bind:value={variety.color}
      on:change={() => { updateProduct(); varietyColor.set(variety.color); }}
    />

    {#if !showSizes}
      <div class="quantity">
        <Label>Quantity</Label>
        <TextField
          min={0}
          placeholder="0"
          type="number"
          max={99999}
          bind:value={variety.quantity}
          on:change={updateProduct}
        />
      </div>
    {/if}
  </div>

  {#if showSizes}
    <div class="sizes-wrapper">
      <Label>Sizes</Label>
      <div class="sizes">
        {#each sizes as size (size.value)}
          <TextField
            withItem
            type="number"
            placeholder="0"
            min={0}
            max={99999}
            bind:value={variety.sizes[size.value]}
            on:change={updateProduct}
          >
            <span class="item">{size.value}</span>
          </TextField>
        {/each}
      </div>
    </div>
  {/if}

  <ImageInput bind:value={variety.images} />

  <Button danger on:click={removeVariety} class="mt">
    remove variety
  </Button>
</li>

<style src="../../../../static/css/components/products/new/variety-form.scss"></style>
