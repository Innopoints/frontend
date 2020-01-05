<script>
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import ChipGroup from 'ui/chip-group.svelte';
  import {item} from '@/store/item';
  import getBackground from '@/utils/optimal-color';
  import {API_HOST} from '@/constants/env';

  $: variety = $item.varieties[0];
  $: sizes = $item.inSizes ? Object.keys(variety.sizes).map(size => ({
    label: size,
    disabled: variety.sizes[size] <= 0,
  })) : null;
  $: images = variety.images;

  const changeVariety = e => variety = $item.varieties.find(x => x.color === e.detail.color);
</script>

<Card
  img={images.length ? API_HOST + images[0].url : '/images/create-product/placeholder.svg'}
  imgWrap={false}
  color={getBackground(variety.color) || 'inherit'}
>
  <span class:placeholder={!$item.name} class="name title">{$item.name}</span>
  {#if $item.type}
    <span class="type subtitle">{$item.type}</span>
  {/if}
  {#if $item.description}
    <Labeled label="Description" classname="labeled text mt-2">
      {$item.description}
    </Labeled>
  {/if}
  <div class="card-row top">
    {#if $item.varieties.length > 1}
      <Labeled label="colors" classname="labeled text mt-2" customContent>
        <RadioGroup
            isColor
            name="variety-colors"
            classname="content"
            items={$item.varieties}
            value={variety}
            uniqueKey="color"
            on:change={changeVariety}
        />
      </Labeled>
    {/if}
    {#if sizes}
      <Labeled label="sizes" classname="labeled text mt-2" customContent>
        <ChipGroup
            items={sizes}
            isSmall
            name="sizes"
            classname="content"
            chipclass="chip-wrapper size"
            uniqueKey="label"
        />
      </Labeled>
    {/if}
  </div>
  <div class:mt-2={sizes || variety.quantity || $item.varieties.length > 1 || $item.description} class="card-row">
    <div class="labeled text">
      <span class="label">Price</span>
      <span class="content">
        <span class:placeholder={!$item.price} class="price">{$item.price ? $item.price : ''}</span>
        <svg src="/images/innopoint-sharp.svg" class="innopoint"/>
      </span>
    </div>
    <div class="purchase">
      <span>1337 purchases</span>
      <button class="btn outline">purchase</button>
    </div>
  </div>
</Card>
