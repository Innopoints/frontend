<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import getBackground from '@/utils/optimal-color.js';
  import { groupByColor } from '@/utils/group-varieties.js';
  import { API_HOST } from '@/constants/env.js';

  export let id;
  export let name;
  export let type;
  export let price;
  export let varieties = [];
  export let short = false;

  let varietiesByColor = groupByColor(varieties);
  let colors = [...varietiesByColor.keys()];
  let selectedColor = colors[0];
  let altText = 'Product image: ';
  if (type) {
    altText += `"${name}" ${type}`;
  } else {
    altText += name;
  }
  $: imageURL = (
    varietiesByColor.get(selectedColor)[0].images.length !== 0 ?
      API_HOST + varietiesByColor.get(selectedColor)[0].images[0]
      : '/images/create-product/placeholder.svg'
  );
</script>

<Card classname="with-image">
  {#if colors.length > 1 && !short}
    <div class="image">
      <img
        src={imageURL}
        style="background: {getBackground(selectedColor)}"
        alt={altText}
      />
      <RadioGroup
        isColor
        values={colors}
        bind:value={selectedColor}
        classname="color-options"
        name="color-{id}"
      />
    </div>
  {:else}
    <img
      src={imageURL}
      style="background: {getBackground(selectedColor)}"
      alt={altText}
      class="image"
    />
  {/if}

  <div class="content">
    <div class="title">{name}</div>
    {#if type}
      <div class="subtitle">{type}</div>
    {/if}
    {#if short}
      <Button href="/product/{id}" isOutline>view</Button>
    {:else}
      <div class="card-row">
        <Labeled label="Price">
          <span class="content">
            <span class="price">{price}</span>
            <svg src="images/innopoint-sharp.svg" class="innopoint" />
          </span>
        </Labeled>
        <Button href="/product/{id}" isOutline>view</Button>
      </div>
    {/if}
  </div>
</Card>
