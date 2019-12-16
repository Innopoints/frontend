<script>
  import { createEventDispatcher } from 'svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import ChipGroup from 'ui/chip-group.svelte';
  import Button from 'ui/button.svelte';

  import {isAuthed, user} from '@/store/user';

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
    if (inSizes && chosenSize) {
      // todo: open modal
      err = false;
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
        <ChipGroup
          items={sizes}
          isSmall
          name="sizes"
          classname="radio-options"
          chipclass="chip-wrapper size"
          uniqueKey="label"
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
      <div class="purchases">
        {purchases || 0} purchases
      </div>
      <Button isFilled on:click={purchase}>purchase</Button>
      <!--<Button isFilled>edit</Button>-->
      <!-- <a href="###">Sign in</a> to purchase -->
    </div>
  </div>
</div>
