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
      <h2>Varieties</h2>
      <Toggle
        :checked="inSizes"
        :click="toggleSizes"
        label="the product comes in sizes"
      />
    </header>

    <ul>
      <li class="variety">
        <div class="settings">
          <Dropdown :chevron="false">
            <template v-slot:opener>
              choose color
              <div class="selected-color" style="background-color: blueviolet" />
            </template>
            <template>
              kill me
            </template>
          </Dropdown>

          <div v-if="!inSizes" class="quantity">
            <label for="quantity">Quantity</label>
            <TextField
              id="quantity"
              type="number"
            />
          </div>
        </div>


        <div v-if="inSizes" class="sizes-wrapper">
          <label class="label">Sizes</label>
          <div class="sizes">
            <TextField
              item="text"
              text="XS"
              type="number"
              class="right-align"
              placeholder="0"
            />
            <TextField
              item="text"
              text="S"
              type="number"
              class="right-align"
              placeholder="0"
            />
            <TextField
              item="text"
              text="M"
              type="number"
              class="right-align"
              placeholder="0"
            />
            <TextField
              item="text"
              text="L"
              type="number"
              class="right-align"
              placeholder="0"
            />
            <TextField
              item="text"
              text="XL"
              type="number"
              class="right-align"
              placeholder="0"
            />
            <TextField
              item="text"
              text="XXL"
              type="number"
              class="right-align"
              placeholder="0"
            />
          </div>
        </div>

        <Dropzone
          id="dropzone"
          :options="options"
          :destroyDropzone="false"
          :useCustomSlot="true"
          class="image-platform"
        >
          <img class="icon mr" src="/images/create-product/image.svg" />
          <label class="title" for="file-input1">
            drag &amp; drop here or click to upload photos
          </label>
          <small>Make sure the ratio is 1:1 (square)</small>
        </Dropzone>

        <div class="image-platform">
          <input
            id="file-input1"
            type="file"
            multiple
            accept="image/*"
          />
          <img class="icon mr" src="/images/create-product/image.svg" />
          <label class="title" for="file-input1">
            drag &amp; drop here or click to upload photos
          </label>
          <small>Make sure the ratio is 1:1 (square)</small>
        </div>
      </li>
    </ul>
  </form>
</template>

<script>
  import FormField from '../../components/ui/form-field';
  import TextField from '../../components/ui/text-field';
  import Toggle from '../../components/ui/toggle';
  import Dropdown from '../../components/ui/dropdown';
  import Dropzone from 'nuxt-dropzone';

  export default {
    name: 'ProductEditForm',
    components: {
      Dropdown,
      Toggle,
      TextField,
      FormField,
      Dropzone
    },
    data() {
      return {
        inSizes: false,
        options: {
          url: "http://httpbin.org/anything"
        }
      };
    },
    methods: {
      toggleSizes() {
        this.inSizes = !this.inSizes;
      }
    }
  };
</script>
