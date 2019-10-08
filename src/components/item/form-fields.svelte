<script>
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';

  import {item, changeItemField} from '@/store/item';
  function setField(field, value) {
    changeItemField(field, value);
  }
</script>

<FormField
    id="name"
    title="Display Name"
    subtitle="If the product has a print, make that the name. Short names work best."
    required
>
  <TextField
      id="name"
      bind:value={$item.name}
      on:change="{(e) => setField('name', e.detail)}"
      placeholder="I <3 Innopolis"
  />
</FormField>

<FormField
    id="type"
    title="Type of product"
    subtitle="If the print takes the name, use this field for the type. Leave blank otherwise."
>
  <TextField
      id="type"
      bind:value={$item.type}
      on:change="{(e) => setField('type', e.detail)}"
      placeholder="sweatshirt"
  />
</FormField>

<FormField id="description" title="Description">
  <TextField
      bind:value={$item.description}
      on:change="{(e) => setField('description', e.detail)}"
      multiline
      placeholder="High quality bulletproof fabric"
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
      min="0"
      max="1000000"
      maxLength="6"
      bind:value={$item.price}
      on:change="{(e) => setField('price', e.detail)}"
      type="number"
      item
      right
  >
    <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
  </TextField>
</FormField>
