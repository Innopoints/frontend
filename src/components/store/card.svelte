<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';

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

<Card img={selected.images[0]} color={selected.background}>
  <div class="title">{name}</div>
  <span class="subtitle">{type}</span>
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
        {price}
        <svg src="images/innopoint-sharp.svg" class="innopoint" />
      </Labeled>
      <Button isOutline>view</Button>
    </div>
  {:else}
    <Button isOutline>view</Button>
  {/if}
</Card>
