<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from '@sapper/app';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import Button from 'ui/button.svelte';
  import { login } from '@/utils/auth.js';
  import s from '@/utils/plural-s.js';

  const { page } = stores();

  const dispatch = createEventDispatcher();

  export let productControl;
  export let selectedColor;
  export let account;

  let selectedVarietyID = null;
  let err = false;
  let animation = false;
  let outOfStock = false;

  $: {
    // not in sizes, select variety automatically
    if (!productControl.productSized) {
      const varietiesOfSelectedColor = productControl.varietiesByColor.get(selectedColor);
      selectedVarietyID = varietiesOfSelectedColor[0].id;
    }
    if (selectedVarietyID != null) {
      outOfStock = productControl.varietyMap.get(selectedVarietyID).amount === 0;
    } else {
      outOfStock = false;
    }
  }

  function purchase() {
    if (selectedVarietyID == null) {
      err = true;
      animation = true;
      setTimeout(() => animation = false, 1000);
      return;
    }
    err = false;
    dispatch('purchase', { varietyID: selectedVarietyID });
  }

  function changeColor({ detail }) {
    // if the new color has a variety of the same size, select it. Otherwise, invalidate selected size
    if (productControl.productSized && selectedVarietyID != null) {
      const oldSize = productControl.varietyMap.get(selectedVarietyID).size;
      const varietiesOfNewColor = productControl.varietiesByColor.get(detail);
      const varietyOfNewColorOldSize = varietiesOfNewColor.find(variety => variety.size === oldSize);
      if (varietyOfNewColorOldSize != null && varietyOfNewColorOldSize.amount > 0) {
        selectedVarietyID = varietyOfNewColorOldSize.id;
      } else {
        selectedVarietyID = null;
      }
    }
    dispatch('color-change', detail);
  }
</script>

<div class="content">
  <header>
    <div class="title">
      {productControl.product.name}
    </div>
    {#if productControl.product.type}
      <div class="subtitle">
        {productControl.product.type}
      </div>
    {/if}
  </header>

  {#if productControl.product.description}
    <Labeled label="description" classname="description">
      <span class="text">
        {productControl.product.description}
      </span>
    </Labeled>
  {/if}

  <div class="parameters">
    {#if productControl.colors.length > 1}
      <Labeled label="colors" classname="colors">
        <RadioGroup
          isColor
          items={productControl.colors.map(val => ({ value: val }))}
          classname="radio-options"
          bind:value={selectedColor}
          on:change={changeColor}
          name="color"
        />
      </Labeled>
    {/if}
    {#if productControl.productSized}
      <Labeled
        label="sizes"
        classname="sizes{err ? ' wrong' : ''}{animation ? ' fire-animation' : ''}"
      >
        <RadioChipGroup
          labels={productControl.varietiesByColor.get(selectedColor).map(x => x.size)}
          items={productControl.varietiesByColor.get(selectedColor).map(x => x.id)}
          small
          name="sizes"
          classname="radio-options"
          chipclass="size"
          bind:value={selectedVarietyID}
        />
        <span class="not-selected">please, select a size</span>
      </Labeled>
    {/if}
  </div>

  <div class="purchase-details">
    <div class="labeled text">
      <span class="label">
        Price
      </span>
      <span class="price" title="Not enough innopoints">
        {productControl.product.price}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
        {#if account && account.balance < productControl.product.price && !account.is_admin}
          <svg src="/images/icons/frown.svg" class="frown" />
        {/if}
      </span>
    </div>
    <div class="action{account != null ? ' purchaseable' : ''}">
      {#if account != null}
        <div class="purchases">
          {productControl.totalPurchases || 0} purchase{s(productControl.totalPurchases)}
        </div>
        {#if outOfStock}
          <p class="out-of-stock">out of stock</p>
        {/if}
        {#if account.is_admin}
          <Button isFilled href="{$page.path}/edit">edit</Button>
        {:else}
          <Button
            isFilled
            on:click={purchase}
            disabled={account.balance < productControl.product.price || outOfStock}
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