<script>
  import openFiles from '@/utils/read-files';
  import Card from 'ui/card.svelte';
  import Labeled from 'ui/labeled.svelte';
  import {item} from '@/store/item';

  let images = [];
  $: variety = $item.varieties[0];
  $: (async() => images = await openFiles(variety.images))();
  // const changeVariety = e => {
  //   variety = $item.variety[e.detail];
  // };
</script>

<Card
    img={images.length ? images[0] : '/images/create-product/placeholder.svg'}
    imgWrap={false}
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
  <div class="card-row">
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
