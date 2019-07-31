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
      ref="dropzone"
      :id="'dropzone-'+name"
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
      <Draggable
        :list="hasFiles ? dropzoneObject.files : []"
        :class="'dragzone-' + name"
        :group="name"
        handle="[data-move]"
        class="images"
      >
        <template v-if="hasFiles">
          <div v-for="(file, index) in dropzoneObject.files" :key="file.upload.uuid" class="image card with-image">
            <img :src="file.dataURL" :alt="file.name" />
            <div class="actions">
              <button
                @click="remove(index)"
                type="button"
                class="btn danger round"
                title="Remove image"
              >
                <img src="/images/product-edit/x.svg" />
              </button>
              {{ index }}
              <button
                type="button"
                class="btn normal round"
                title="Move image"
                data-move
              >
                <img src="/images/product-edit/move.svg" />
              </button>
            </div>
          </div>
        </template>
      </Draggable>
    </Dropzone>

    <Button v-if="removable" label="remove variety" danger />
  </li>
</template>

<script>
  import TextField from '../../components/ui/text-field';
  import RadioGroup from '../../components/ui/radio-group';
  import Dropzone from 'nuxt-dropzone';
  import Button from '../../components/ui/button';
  import Draggable from 'vuedraggable';

  export default {
    name: 'ProductFormVariety',
    components: {
      Button,
      RadioGroup,
      TextField,
      Dropzone,
      Draggable,
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
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dropzoneOptions: {
          url: '#',
          acceptedFiles: 'image/*',
          previewTemplate: '<template></template>', // dummy element
          // previewsContainer: `.dragzone-${this.name}`,
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
      this.$watch('dropzoneObject.files', (arr) => {
        if(arr.length == 0) {
          this.dropzoneObject.enable();
        }
        else {
          this.dropzoneObject.disable();
        }
      });
    },
    methods: {
      addFile(/* file */) {
        this.$watch(`dropzoneObject.files`, () => {});  // simply to add an observer
      },
      remove(index) {
        this.dropzoneObject.files.splice(index, 1);
      },
      thumbnail(/* file, dataURL */) {
        this.dropzoneObject.files.__ob__.dep.notify();
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

.image-platform:not(.has-content) {
  background-color: #F6F6F6;
  cursor: pointer;
}
</style>
