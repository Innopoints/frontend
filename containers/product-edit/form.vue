<template>
  <form>
    <FormField
      id="name"
      title="Display Name"
      subtitle="If the product has a print, make that the name. Short names work best."
      required
    >
      <TextField
        id="name"
        :value="$store.state.newProduct.name"
        @change="$store.commit('newProduct/setField', {key: 'name', value: $event})"
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
        :value="$store.state.newProduct.type"
        @change="$store.commit('newProduct/setField', {key: 'type', value: $event})"
        placeholder="sweatshirt"
      />
    </FormField>

    <FormField id="description" title="Description">
      <TextField
        :value="$store.state.newProduct.description"
        @change="$store.commit('newProduct/setField', {key: 'description', value: $event})"
        multiline
        placeholder="High quality bulletproof fabric"
      />
    </FormField>

    <FormField
      id="price"
      title="Price"
      class="horizontal"
      required
    >
      <TextField
        id="price"
        :min="0"
        :max="1000000"
        :max-length="6"
        :value="$store.state.newProduct.price"
        @change="$store.commit('newProduct/setField', {key:'price', value: $event})"
        type="number"
        item="img"
        right
        src="/images/innopoint-sharp.svg"
      />
    </FormField>

    <header class="varieties">
      <h2>Varieties</h2>
      <Toggle
        :checked="$store.state.newProduct.inSizes"
        @click="$store.commit('newProduct/toggleSizes')"
        label="the product comes in sizes"
      />
    </header>

    <ul>
      <ProductFormVariety
        v-for="i in $store.state.newProduct.varietiesCount"
        :colors="['#FF0000', '#00FF00', '#0000FF', '#000000']"
        :key="i"
        :index="i-1"
        :name="i.toString()"
        :removable="i !== 1"
        :in-sizes="$store.state.newProduct.inSizes"
      />

      <li class="more">
        <Button
          @click="$store.commit('newProduct/addVariety')"
          img="/images/icons/plus.svg"
          label="add another variety"
        />
      </li>
    </ul>
  </form>
</template>

<script>
  import FormField from '../../components/ui/form-field';
  import TextField from '../../components/ui/text-field';
  import Toggle from '../../components/ui/toggle';
  import ProductFormVariety from './variety';
  import Button from '../../components/ui/button';

  export default {
    name: 'ProductEditForm',
    components: {
      Button,
      ProductFormVariety,
      Toggle,
      TextField,
      FormField,
    },
    data() {
      return {
      };
    },
    methods: {
      toggleSizes() {
        this.inSizes = !this.inSizes;
      },
    },
  };
</script>
