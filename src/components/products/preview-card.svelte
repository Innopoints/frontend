<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import getBackground from '@/utils/optimal-color.js';
  import { API_HOST } from '@/constants/env.js';
  import s from '@/utils/plural-s.js';

  export let product;
  let selectedIndex = 0;
  $: selectedVariety = product && product.varieties[selectedIndex];
  $: imageUrl = (
    selectedVariety && selectedVariety.images && selectedVariety.images.length > 0 ?
      API_HOST + selectedVariety.images[0]
    : '/images/create-product/placeholder.svg'
  );
  $: colors = product && product.varieties.map(x => x.color).filter(x => x != null);
  $: sizes = selectedVariety && selectedVariety.sizes && Object.keys(selectedVariety.sizes).filter(size => selectedVariety.sizes[size] > 0);
  let altText = '';
  if (product) {
    altText = 'Product image: ';
    if (product.type) {
      altText += `"${product.name}" ${product.type}`;
    } else {
      altText += product.name;
    }
  }

  function switchVariety(event) {
    for (let i = 0; i < product.varieties.length; ++i) {
      if (event.detail === product.varieties[i].color) {
        selectedIndex = i;
        break;
      }
    }
  }
</script>

<Card classname="with-image">
  <img
    src={imageUrl}
    style="background: {getBackground(selectedVariety && selectedVariety.color)}"
    alt={altText}
    class="image"
  />
  <div class="content">
    <span class:placeholder={!product || !product.name} class="name title">
      {product && product.name || ''}
    </span>
    {#if product && product.type}
      <span class="type subtitle">{product.type}</span>
    {/if}
    {#if product && product.description}
      <Labeled label="Description" classname="mt-2">
        {product.description}
      </Labeled>
    {/if}
    {#if (colors && colors.length > 1) || (sizes && sizes.length > 1)}
      <div class="card-row top">
        {#if colors && colors.length > 1}
          <Labeled label="colors" classname="mt-2">
            <RadioGroup
              isColor
              name="variety-colors"
              classname="content"
              items={colors.map(val => ({ value: val }))}
              value={selectedVariety.color}
              on:change={switchVariety}
            />
          </Labeled>
        {/if}
        {#if sizes && product.sized && sizes.length > 1}
          <Labeled label="sizes" classname="mt-2">
            <RadioChipGroup
              items={sizes}
              small
              name="sizes"
              classname="content"
              chipclass="size"
            />
          </Labeled>
        {/if}
      </div>
    {/if}

    <div class="card-row mt-2">
      <Labeled label="Price">
        <span class="content">
          <span class:placeholder={!product || !product.price} class="price">
            {product && product.price || ''}
          </span>
          <svg
            src="/images/innopoint-sharp.svg"
            class="innopoint"
            alt="innopoint{s(product && product.price)}"
          />
        </span>
      </Labeled>
      <div class="purchase">
        <span>1337 purchases</span>
        <Button isOutline>purchase</Button>
      </div>
    </div>
  </div>
</Card>
