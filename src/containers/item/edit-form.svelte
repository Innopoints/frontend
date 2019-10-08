<script>
  import Button from 'ui/button.svelte';
  import FormField from 'ui/form-field.svelte';
  import TextField from 'ui/text-field.svelte';

  import {item, changeItemField} from '@/store/item';
  function setField(field, value) {
    changeItemField(field, value);
  }
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
      <svg src="/images/innopoint-sharp.svg" class="icon" />
    </TextField>
  </FormField>

  <header class="varieties">
    <h2>Varieties</h2>
    <!--<Toggle
        :checked="$store.state.newProduct.inSizes"
        @click="$store.commit('newProduct/toggleSizes')"
        label="the product comes in sizes"
    />-->
  </header>

  <ul>
    <!--<ProductFormVariety
        v-for="i in $store.state.newProduct.varietiesCount"
        :colors="['#FF0000', '#00FF00', '#0000FF', '#000000']"
        :key="i"
        :index="i-1"
        :name="i.toString()"
        :removable="i !== 1"
        :in-sizes="$store.state.newProduct.inSizes"
    />-->

    <li class="more">
      <Button>
        <svg src="images/icons/plus.svg" class="icon" />
        add another variety
      </Button>
    </li>
  </ul>
</form>
