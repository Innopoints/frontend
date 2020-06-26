<script>
  import { Card, Button, RadioGroup, RadioChipGroup } from 'attractions';
  import Labeled from 'ui/labeled.svelte';
  import getBackground from '@/utils/optimal-color.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import s from '@/utils/plural-s.js';

  export let product;
  let selectedVarietyIndex = 0;

  $: visibleVarieties = (
    $product.varieties
      .filter(variety =>
        variety.quantity > 0
        || Object.keys(variety.sizes).some(size => variety.sizes[size] > 0),
      )
  );
  $: {
    if (selectedVarietyIndex >= visibleVarieties.length) {
      selectedVarietyIndex = 0;
    }
  }
  $: selectedVariety = visibleVarieties[selectedVarietyIndex];
  $: colors = (
    visibleVarieties
      .filter(variety => variety.color != null)
      .map(variety => ({ value: variety.color }))
  );
  $: sizes = (
    $product.sized && selectedVariety != null ?
      Object.keys(selectedVariety.sizes)
        .filter(size => selectedVariety.sizes[size] > 0)
        .map(size => ({ value: size }))
      : null
  );

  function switchVariety({ detail }) {
    selectedVarietyIndex = visibleVarieties.findIndex(
      variety => variety.color === detail.value,
    );
  }
</script>

<div class="preview-card">
  <Card tight>
    {#if selectedVariety != null && selectedVariety.images.length > 0}
      <img
        src="{API_HOST_BROWSER}/file/{selectedVariety.images[0]}"
        style={getBackground(selectedVariety.color)}
        alt={$product.type ? `"${$product.name}" ${$product.type}` : $product.name}
      />
    {:else}
      <img src="/images/create-product/placeholder.svg" alt="Nothing" />
    {/if}
    <div class="content">
      <div class:placeholder={!$product.name} class="name">
        {$product.name || ''}
      </div>
      {#if $product.type}
        <div class="type">{$product.type}</div>
      {/if}
      {#if $product.description}
        <Labeled label="Description" class="description">
          {$product.description}
        </Labeled>
      {/if}
      {#if (colors.length > 1) || (sizes != null && sizes.length > 1)}
        <div class="selectables-row">
          {#if colors && colors.length > 1}
            <Labeled label="colors">
              <RadioGroup
                color
                name="variety-colors"
                class="variety-colors"
                items={colors}
                value={selectedVariety.color}
                on:change={switchVariety}
              />
            </Labeled>
          {/if}
          {#if sizes != null && sizes.length > 1}
            <Labeled label="sizes">
              <RadioChipGroup
                items={sizes}
                small
                name="variety-sizes"
              />
            </Labeled>
          {/if}
        </div>
      {/if}

      <div class="bottom-row">
        <Labeled label="Price">
          <div class="price">
            <span class:placeholder={!$product.price} class="price">
              {$product.price || ''}
            </span>
            <svg
              src="images/innopoint-sharp.svg"
              class="innopoint"
              alt="innopoint{s($product.price)}"
            />
          </div>
        </Labeled>
        <div class="purchase">
          <div class="count">1337 purchases</div>
          <Button outline>purchase</Button>
        </div>
      </div>
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/products/new/preview-card.scss"></style>
