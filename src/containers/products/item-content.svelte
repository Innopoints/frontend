<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from '@sapper/app';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import Button from 'ui/button.svelte';
  import { login } from '@/utils/auth.js';

  const { page } = stores();

  const dispatch = createEventDispatcher();

  export let productControl;
  export let selectedColor;
  export let account;

  let selectedVarietyID = null;
  let err = false;
  let animation = false;

  function purchase() {
    if (!productControl.productSized || selectedVarietyID != null) {
      err = false;
      dispatch('purchase', { varietyID: selectedVarietyID });
    } else {
      err = true;
      animation = true;
      setTimeout(function() {
        animation = false;
      }, 1000);
    }
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
          values={productControl.colors.map(val => ({ value: val }))}
          classname="radio-options"
          bind:value={selectedColor}
          on:change={({ detail }) => dispatch('color-change', detail)}
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
          {productControl.totalPurchases || 0} purchases  <!-- item amount -->
        </div>
        {#if account.is_admin}
          <Button isFilled href="{$page.path}/edit">edit</Button>
        {:else}
          <Button
            isFilled
            on:click={purchase}
            disabled={account.balance < productControl.product.price}
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
