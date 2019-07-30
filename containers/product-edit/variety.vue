<template>
  <li class="variety">
    <div class="settings">
      <div class="color-picker">
        choose color:&nbsp;
        <RadioGroup
          :items="colorOptions"
          name="group"
          horizontal
        />
      </div>

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
      ref="dropzone"
      :options="dropzoneOptions"
      :destroyDropzone="false"
      :useCustomSlot="true"
      :include-styling="false"
      @vdropzone-file-added="addFile"
      @vdropzone-thumbnail="thumbnail"
      :class="{'has-content': hasFiles}"
      class="image-platform"
    >
      <template v-if="!hasFiles">
        <img class="icon mr" src="/images/create-product/image.svg" />
        <label class="title" for="file-input1">
          drag &amp; drop here or click to upload photos
        </label>
        <small>Make sure the ratio is 1:1 (square)</small>
      </template>
    </Dropzone>

    <Button v-if="removable" label="remove variety" danger />
  </li>
</template>

<script>
  import TextField from '../../components/ui/text-field';
  import RadioGroup from '../../components/ui/radio-group';
  import Dropzone from 'nuxt-dropzone';
  import Button from '../../components/ui/button';

  export default {
    name: 'ProductFormVariety',
    components: {
      Button,
      RadioGroup,
      TextField,
      Dropzone,
    },
    props: {
      inSizes: Boolean,
      removable: Boolean,
      colors: {
        type: Array,
        validator(value) {
          if(!Array.isArray(value))
            return false;
          return value.every(item => typeof item === 'string');
        },
      },
    },
    data() {
      return {
        dropzoneOptions: {
          url: '#',
          acceptedFiles: 'image/*',
          previewTemplate: `
            <div class="image card with-image">
              <img data-img />
              <div class="actions">
                <button type="button" class="btn danger round" data-remove title="Remove image">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <button type="button" class="btn normal round" data-move title="Move image">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
                </button>
              </div>
            </div>`,
        },
        dropzoneObject: null,
      };
    },
    computed: {
      colorOptions() {
        return this.colors.map(color => ({
          color,
        }) );
      },
      hasFiles() {
        if(this.dropzoneObject == null)
          return false;
        return this.dropzoneObject.files.length > 0;
      },
    },
    mounted() {
      this.dropzoneObject = this.$refs.dropzone.dropzone;
      this.$watch('dropzoneObject.files', () => {});
    },
    methods: {
      addFile(file) {
        const index = this.dropzoneObject.files.findIndex(item => item == file);
        file.index = index;
      },
      thumbnail(file, dataUrl) {
        const wrapper = file.previewElement;
        if(!wrapper)
          return;
        const thumbnailElement = wrapper.querySelector("[data-img]");
        thumbnailElement.alt = file.name;
        thumbnailElement.src = dataUrl;

        const deleteButton = wrapper.querySelector('.actions button[data-remove]');
        deleteButton.onclick = () => {
          this.dropzoneObject.files.splice(file.index, 1);
          wrapper.remove();
        };

        const moveButton = wrapper.querySelector('.actions button[data-move]');
      },
    },
  };
</script>

<style lang="scss" scoped>
.settings {
  justify-content: space-between;
}

.color-picker {
  display: flex;
  align-items: center;
}

.dropzone {
  &:hover {
    background-color: #F6F6F6;
  }
  &.dz-clickable {
    cursor: pointer;
  }
}
</style>
