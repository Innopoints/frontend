<script>
  import { createEventDispatcher } from 'svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';
  import Button from 'ui/button.svelte';
  import Snackbar from 'ui/snackbar.svelte';

  import {isAuthed, user} from '@/store/user';
  // import {openModal} from '@/store/modal';
  import {open as snackbarOpen, closeSnackbar} from '@/store/snackbar';

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
  const changeVariety = e => {
    chosenSize = null;
    dispatch('change', e.detail);
  };

  let chosenSize = null;
  let err = false;
  let animation = false;
  const chooseSize = e => chosenSize = e.detail;
  const purchase = () => {
    if (!inSizes || chosenSize) {
      err = false;
      // openModal();
    } else {
      err = true;
      animation = true;
      setTimeout(function() {
        animation = false;
      }, 1000);
    }
  };
</script>

<div class="content">
  <Snackbar bind:value={$snackbarOpen}>
    <div class="text">Purchase successful! Track its status in the <a href="/profile">profile</a>.</div>
    <Button on:click={closeSnackbar}>dismiss</Button>
  </Snackbar>

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
      <Labeled label="sizes" classname="labeled text sizes{err ? ' wrong' : ''}{animation ? ' fire-animation' : ''}" customContent>
        <RadioChipGroup
          values={sizes}
          isSmall
          name="sizes"
          classname="radio-options"
          chipclass="size"
          on:change={chooseSize}
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
        {price}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
        {#if $isAuthed && $user.balance < price}
          <svg src="/images/icons/frown.svg" class="frown" />
        {/if}
      </span>
    </div>
    <div class="action">
      {#if $isAuthed}
        <div class="purchases">
          {purchases || 0} purchases
        </div>
        {#if $user.is_admin}
          <Button isFilled>edit</Button>
        {:else}
          <Button isFilled on:click={purchase}>purchase</Button>
        {/if}
      {:else}
        <a href="/profile">Sign in</a> to purchase
      {/if}
    </div>
  </div>
</div>
