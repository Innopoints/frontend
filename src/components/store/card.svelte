<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';

  export let id;
  export let name;
  export let type;
  export let price;
  export let varieties = [];
  export let short = false;

  $: selected = varieties[0];
</script>

<Card img={selected.images[0]} color={selected.background}>
  <!--  TODO: implement and use Radio group for this card -->
  <!--<template v-if="varieties.length > 1 && !isShort" v-slot:radio>
    <RadioGroup
        :items="varieties"
        :name="'color-' + id"
        v-model="selected"
        class="color-options"
    />
  </template>-->
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
