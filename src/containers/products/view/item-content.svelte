<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from '@sapper/app';
  import { Button, RadioGroup, RadioChipGroup } from 'attractions';
  import { classes, s } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import { login } from 'src/utils/auth.js';

  const { page } = stores();

  export let product;
  export let varietiesByColor;
  export let colors;
  export let totalPurchases;
  export let account;
  export let sizes;
  export let selectedColor;

  const colorItems = colors.map(val => ({ value: val }));
  let selectedVariety = product.sized ? null : varietiesByColor.get(selectedColor)[0];
  let err = false;
  let animation = false;
  $: sizeItems = varietiesByColor.get(selectedColor).map(variety => ({
    value: variety,
    label: variety.size,
    disabled: variety.amount <= 0,
  }));
  $: sizeItems.sort(
    (item1, item2) => sizes.indexOf(item1.label) - sizes.indexOf(item2.label),
  );
  $: affordable = account == null || account.balance >= product.price;
  $: changeColor(selectedColor);

  function purchase() {
    if (selectedVariety == null) {
      err = true;
      animation = true;
      setTimeout(() => animation = false, 1000);
      return;
    }
    err = false;
    dispatch('purchase', { varietyID: selectedVariety.id });
    selectedVariety = null;
  }

  function changeColor(color) {
    if (product.sized) {
      if (selectedVariety == null) {
        return;
      }
      // Try to find the previously selected size among the varieties of a new color
      const selectedSize = selectedVariety.size;
      const varietiesOfNewColor = varietiesByColor.get(color);
      selectedVariety = varietiesOfNewColor.find(
        variety => variety.size === selectedSize && variety.amount > 0,
      );
    } else {
      // Product is not in sizes, select variety automatically
      selectedVariety = varietiesByColor.get(selectedColor)[0];
    }
  }

  const dispatch = createEventDispatcher();
</script>

<div class="product">
  <header>
    <div class="name">{product.name}</div>
    {#if product.type}
      <div class="type">{product.type}</div>
    {/if}
  </header>

  {#if product.description}
    <Labeled label="Description" class="description">
      {product.description}
    </Labeled>
  {/if}

  <div class="parameters">
    {#if colors.length > 1}
      <Labeled label="Colors" class="colors">
        <RadioGroup
          color
          items={colorItems}
          class="radio-options"
          bind:value={selectedColor}
          name="color"
        />
      </Labeled>
    {/if}
    {#if product.sized}
      <div class={classes('sizes', err && 'wrong', animation && 'fire-animation')}>
        <Labeled label="Sizes">
          <RadioChipGroup
            items={sizeItems}
            small
            name="size"
            class="radio-options"
            bind:value={selectedVariety}
          />
        </Labeled>
        <span class="not-selected">please, select a size</span>
      </div>
    {/if}
  </div>

  <div class="purchase-details">
    <Labeled label="Price">
      <span
        class="price"
        title={!affordable && !account.is_admin ? "Not enough innopoints" : null}
      >
        {product.price}
        <svg src="static/images/innopoint-sharp.svg" class="innopoint" />
        {#if !affordable && !account.is_admin}
          <svg src="static/images/icons/frown.svg" class="frown" />
        {/if}
      </span>
    </Labeled>
    <div class={classes('action', account != null && 'purchaseable')}>
      {#if account != null}
        <div class="purchases">
          {totalPurchases || 0} purchase{s(totalPurchases)}
        </div>
        {#if account.is_admin}
          <Button filled href="{$page.path}/edit">edit</Button>
        {:else}
          <Button
            filled
            on:click={purchase}
            disabled={account.balance < product.price}
          >
            purchase
          </Button>
        {/if}
      {:else}
        <a on:click|preventDefault={login} href="/login">Sign in</a> to purchase
      {/if}
    </div>
  </div>
</div>

<style src="../../../../static/css/containers/products/view/item-content.scss"></style>
