<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Switch from 'ui/switch.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import FormVariety from '@/components/product/form-variety.svelte';

  export let product;
  export let colors;
  export let sizes;

  const dispatch = createEventDispatcher();
</script>

<form>
  <FormField
    id="name"
    title="Display Name"
    subtitle="If the product has a print, make that the name. Short names work best."
    required
  >
    <TextField
      id="name"
      placeholder="I <3 Innopolis"
      on:change={({detail}) => dispatch('change', { field: 'name', value: detail })}
      disabled={!!product}
      {...product && { value: product.name || '' }}
    />
  </FormField>

  <FormField
    id="type"
    title="Product Type"
    subtitle="If the print takes the name, use this field for the type. Leave blank otherwise."
  >
    <TextField
      id="type"
      placeholder="sweatshirt"
      on:change={({detail}) => dispatch('change', { field: 'type', value: detail })}
      disabled={!!product}
      {...product && { value: product.type || '' }}
    />
  </FormField>

  <FormField id="description" title="Description">
    <TextField
      multiline
      placeholder="High-quality bulletproof fabric"
      on:change={({detail}) => dispatch('change', { field: 'description', value: detail })}
      disabled={!!product}
      {...product && { value: product.description || '' }}
    />
  </FormField>

  <FormField
    id="price"
    title="Price"
    classname="horizontal"
    required
  >
    <TextField
      id="price"
      type="number"
      min="0"
      max="1000000"
      placeholder="0"
      maxlength="6"
      isWithItem
      isItemRight
      on:change={({detail}) => dispatch('change', { field: 'price', value: detail })}
      disabled={!!product}
      {...product && { value: product.price || '' }}
    >
      <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
    </TextField>
  </FormField>

  {#if product}
    <header class="varieties">
      <h2>Varieties</h2>
      <Switch
        name="sizes"
        label="the product comes in sizes"
        value={product.sized}
        on:change={({target}) => dispatch('change', { field: 'sized', value: target.checked })}
      />
    </header>

    <ul>
      {#each product.varieties as variety, i (i)}
        <FormVariety
          {variety}
          index={i}
          removable={i !== 0}
          {colors} {sizes}
          showSizes={product.sized}
          on:new-color
          on:remove-variety
          on:change-variety
          on:new-file
          on:delete-file
          on:swap-files
        />
      {/each}

      <li class="more">
        <Button on:click={() => dispatch('create-variety')}>
          <svg src="images/icons/plus.svg" class="icon mr" />
          add another variety
        </Button>
      </li>
    </ul>
  {/if}
</form>
