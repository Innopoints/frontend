<template>
  <form>
    <FormField
      id="name"
      title="Display Name"
      subtitle="If the product has a print, make that the name. Short names work best."
      required
    >
      <TextField id="name" placeholder="I <3 Innopolis" />
    </FormField>

    <FormField
      id="type"
      title="Type of product"
      subtitle="If the print takes the name, use this field for the type. Leave blank otherwise."
    >
      <TextField id="type" placeholder="sweatshirt" />
    </FormField>

    <FormField id="description" title="Description">
      <TextField multiline placeholder="High quality bulletproof fabric" />
    </FormField>

    <FormField id="price" title="Price" required>
      <TextField
        id="price"
        item="img"
        right
        src="/images/create-product/innopoint.svg"
      />
    </FormField>
  </form>
</template>

<script>
  import FormField from '../../components/ui/form-field';
  import TextField from '../../components/ui/text-field';

  export default {
    name: 'ProductEditForm',
    components: {
      TextField,
      FormField
    }
  };
</script>
