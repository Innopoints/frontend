<script>
  import { flip } from 'svelte/animate';
  import { Button, Switch, FormField, TextField, H2, Divider } from 'attractions';
  import VarietyForm from '@/components/products/new/variety-form.svelte';
  import spaceOnly from '@/utils/space-only.js';
  import { getBlankVariety } from '@/constants/products/blank-product.js';

  export let product;
  export let colors;
  export let sizes;

  function addVariety() {
    $product.varieties.push(getBlankVariety());
    $product.varieties = $product.varieties;
  }
</script>

<div class="form">
  <FormField
    name="Display Name"
    help="If the product has a print, make that the name. Short names work best."
    required
    errors={[spaceOnly($product.name) && 'The name cannot be empty.']}
  >
    <TextField
      bind:value={$product.name}
      placeholder="I <3 Innopolis"
      maxlength={128}
    />
  </FormField>

  <FormField
    name="Product Type"
    help="If the print takes the name, use this field for the type. Leave blank otherwise."
  >
    <TextField
      bind:value={$product.type}
      placeholder="sweatshirt"
      maxlength={128}
    />
  </FormField>

  <FormField name="Description">
    <TextField
      bind:value={$product.description}
      multiline
      placeholder="High-quality bulletproof fabric"
      maxlength={1024}
    />
  </FormField>

  <FormField
    name="Price"
    class="horizontal"
    required
    errors={[$product.price < 0 && 'The price must be positive.']}
  >
    <TextField
      bind:value={$product.price}
      type="number"
      min={1}
      max={1000000}
      placeholder="1337"
      maxlength="6"
      withItem
      itemRight
    >
      <svg src="images/innopoint-sharp.svg" class="item" />
    </TextField>
  </FormField>

  <Divider />

  <header class="varieties">
    <H2>Varieties</H2>
    <Switch name="comes-in-sizes" bind:value={$product.sized} slotLeft>
      <span class="mr">the product comes in sizes</span>
    </Switch>
  </header>

  <ul>
    {#each $product.varieties as variety (variety)}
      <div animate:flip={{ duration: 150 }}>
        <VarietyForm {product} {variety} {colors} {sizes} showSizes={$product.sized} />
      </div>
    {/each}

    <li class="more mt">
      <Button on:click={addVariety}>
        <svg src="images/icons/plus.svg" class="mr" />
        add another variety
      </Button>
    </li>
  </ul>
</div>

<style src="../../../../static/css/containers/products/new/product-form.scss"></style>
