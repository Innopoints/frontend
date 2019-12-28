<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import getBackground from '@/utils/optimal-color';

  export let id;
  export let name;
  export let type;
  export let price;
  export let varieties = [];
  export let short = false;

  $: selected = varieties[0];
  const changeColor = (e) => {
    selected = e.detail;
  };
</script>

<Card img={selected.images[0]} color={getBackground(selected.color)}>
  <div class="title">{name}</div>
  {#if type}<span class="subtitle">{type}</span>{/if}
  <div slot="radio">
    {#if varieties.length > 1 && !short}
      <RadioGroup
          items={varieties}
          name="{'color-' + id}"
          value={selected}
          uniqueKey="id"
          classname="color-options"
          isColor
          on:change={changeColor}
      />
    {/if}
  </div>
  {#if !short}
    <div class="card-row">
      <Labeled label="Price">
        <span class="price">{price}</span>
        <svg src="images/innopoint-sharp.svg" class="innopoint" />
      </Labeled>
      <Button href="/item/{id}" isOutline>view</Button>
    </div>
  {:else}
    <Button href="/item/{id}" isOutline>view</Button>
  {/if}
</Card>
