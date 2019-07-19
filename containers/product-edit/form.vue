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

    <FormField
      id="price"
      title="Price"
      class="horizontal"
      required
    >
      <TextField
        id="price"
        item="img"
        right
        src="/images/create-product/innopoint.svg"
      />
    </FormField>

    <header class="varieties">
      <h2>varieties</h2>
      <Toggle
        :checked="inSizes"
        :click="toggleSizes"
        label="the product comes in sizes"
      />
    </header>
  </form>
</template>

<script>
  import FormField from '../../components/ui/form-field';
  import TextField from '../../components/ui/text-field';
  import Toggle from '../../components/ui/toggle';

  export default {
    name: 'ProductEditForm',
    components: {
      Toggle,
      TextField,
      FormField
    },
    data() {
      return {
        inSizes: false
      };
    },
    methods: {
      toggleSizes() {
        this.inSizes = !this.inSizes;
      }
    }
  };
</script>
