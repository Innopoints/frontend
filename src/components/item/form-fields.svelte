<script>
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';
  import {item, changeItemField, saveDraft} from '@/store/item';
</script>

<FormField
    id="name"
    title="Display Name"
    subtitle="If the product has a print, make that the name. Short names work best."
    required
>
  <TextField
      id="name"
      placeholder="I <3 Innopolis"
      bind:value={$item.name}
      on:change="{(e) => changeItemField('name', e.detail)}"
      on:blur={saveDraft}
  />
</FormField>

<FormField
    id="type"
    title="Type of product"
    subtitle="If the print takes the name, use this field for the type. Leave blank otherwise."
>
  <TextField
      id="type"
      placeholder="sweatshirt"
      bind:value={$item.type}
      on:change="{(e) => changeItemField('type', e.detail)}"
      on:blur={saveDraft}
  />
</FormField>

<FormField id="description" title="Description">
  <TextField
      bind:value={$item.description}
      multiline
      placeholder="High quality bulletproof fabric"
      on:change="{(e) => changeItemField('description', e.detail)}"
      on:blur={saveDraft}
  />
</FormField>

<FormField
    id="price"
    title="Price"
    classname="form-field horizontal"
    required
>
  <TextField
      id="price"
      type="number"
      min="0"
      max="1000000"
      maxLength="6"
      isWithItem
      isItemRight
      bind:value={$item.price}
      on:change="{(e) => changeItemField('price', e.detail)}"
      on:blur={saveDraft}
  >
    <svg src="/images/innopoint-sharp.svg" class="item innopoint" />
  </TextField>
</FormField>
