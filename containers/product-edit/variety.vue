<template>
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

    <Button v-if="removable" label="remove variety" danger />
  </li>
</template>

<script>
  import TextField from '../../components/ui/text-field';
  import Dropdown from '../../components/ui/dropdown';
  import Dropzone from 'nuxt-dropzone';
  import Button from '../../components/ui/button';

  export default {
    name: 'ProductFormVariety',
    components: {
      Button,
      Dropdown,
      TextField,
      Dropzone
    },
    props: {
      inSizes: Boolean,
      removable: Boolean
    },
    data() {
      return {
        options: {
          url: "http://example.com"
        },
        vars: 2
      };
    },
  };
</script>
