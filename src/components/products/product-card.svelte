<script>
  import { Card, Button, RadioGroup } from 'attractions';
  import Labeled from 'src/components/common/labeled.svelte';
  import getBackground from 'src/utils/optimal-color.js';
  import { groupByColor } from 'src/utils/product-manipulation.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  export let id;
  export let name;
  export let type;
  export let price;
  export let varieties = [];
  export let short = false;

  const varietiesByColor = groupByColor(varieties);
  const colors = [...varietiesByColor.keys()];
  let selectedColor = colors[0];
  $: imageURL = (
    varietiesByColor.get(selectedColor)[0].images.length !== 0 ?
      `${API_HOST_BROWSER}/file/${varietiesByColor.get(selectedColor)[0].images[0]}`
      : '/images/create-product/placeholder.svg'
  );

  $: outOfStock = varieties.reduce((sum, variety) => variety.amount + sum, 0) === 0;
</script>

<div class="product-card">
  <Card tight>
    {#if colors.length > 1 && !short}
      <div class="image">
        <img
          loading="lazy"
          src={imageURL}
          style={getBackground(selectedColor)}
          alt="Product cover"
        />
        <RadioGroup
          color
          bind:value={selectedColor}
          class="color-options"
          name="color-{id}"
          items={colors.map(val => ({ value: val }))}
        />
      </div>
    {:else}
      <img
        loading="lazy"
        src={imageURL}
        style={getBackground(selectedColor)}
        alt="Product cover"
        class="image"
      />
    {/if}

    <div class="content">
      <div class="title">
        <div class="main">{name}</div>
        {#if outOfStock}
          <div class="out-of-stock">
            out of stock
          </div>
        {/if}
      </div>
      {#if type}
        <div class="subtitle">{type}</div>
      {/if}
      {#if short}
        <Button href="/products/{id}" outline>view</Button>
      {:else}
        <div class="card-row">
          <Labeled label="Price">
            <span class="content">
              <span class="price">{price}</span>
              <svg src="static/images/innopoint-sharp.svg" class="innopoint" />
            </span>
          </Labeled>
          <Button href="/products/{id}" outline>view</Button>
        </div>
      {/if}
    </div>
  </Card>
</div>

<style src="../../../static/css/components/products/product-card.scss"></style>
