<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import fragment from 'svelte-fragment';

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
  <template use:fragment slot="radio">
    {#if varieties.length > 1 && !short}
      <RadioGroup
          items={varieties}
          name="{'color-' + id}"
          selected={selected}
          classname="color-options"
          labelClass="radio"
          isColor
          on:change={changeColor}
      />
    {/if}
  </template>
  <div class="title">{name}</div>
  <span class="subtitle">{type}</span>
  {#if !short}
    <div class="card-row">
      <Labeled label="Price">
        {price}
        <svg src="images/innopoint-sharp.svg" class="innopoint" />
      </Labeled>
      <Button outline>view</Button>
    </div>
  {:else}
    <Button outline>view</Button>
  {/if}
</Card>
