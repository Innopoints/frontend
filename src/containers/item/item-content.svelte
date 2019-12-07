<script>
  import { createEventDispatcher } from 'svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import ChipGroup from 'ui/chip-group.svelte';
  import Button from 'ui/button.svelte';

  export let name;
  export let type;
  export let description;
  export let varieties;
  export let variety;
  export let inSizes;
  export let price;
  export let purchases;

  let dispatch = createEventDispatcher();

  $: sizes = inSizes ? Object.keys(variety.sizes).map(size => ({
    label: size,
    disabled: variety.sizes[size] <= 0,
  })) : null;
  const changeVariety = e => dispatch('change', e.detail);
</script>

<div class="content">
  <header>
    <div class="title">
      {name}
    </div>
    <div class="subtitle">
      {type}
    </div>
  </header>

  <Labeled label="description" classname="labeled text description">
    {description}
  </Labeled>

  <div class="parameters">
    {#if varieties.length > 1}
      <Labeled label="colors" classname="labeled text colors" customContent>
        <RadioGroup
                isColor
                name="variety-colors"
                classname="radio-options"
                items={varieties}
                value={variety}
                uniqueKey="color"
                on:change={changeVariety}
        />
      </Labeled>
    {/if}
    {#if sizes}
      <Labeled label="sizes" classname="labeled text sizes" customContent>
        <ChipGroup
                items={sizes}
                isSmall
                name="sizes"
                classname="radio-options"
                chipclass="chip-wrapper size"
                uniqueKey="label"
        />
        <span class="not-selected">please, select a size</span>
      </Labeled>
    {:else if variety.quantity}
      <Labeled label="Quantity" classname="labeled text sizes">
        {variety.quantity}
      </Labeled>
    {/if}
  </div>

  <div class="purchase-details">
    <div class="labeled text">
        <span class="label">
          Price
        </span>
      <span class="price" title="Not enough innopoints">
          {price}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
          <svg src="/images/icons/frown.svg" class="frown" />
          </span>
    </div>
    <div class="action">
      <div class="purchases">
        1337 {purchases}
      </div>
      <Button isFilled>purchase</Button>
      <!--<Button isFilled>edit</Button>-->
      <!-- <a href="###">Sign in</a> to purchase -->
    </div>
  </div>
</div>
