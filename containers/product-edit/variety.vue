<template>
  <li class="variety">
    <div class="settings">
      <Dropdown
        :chevron="false"
      >
        <template v-slot:label>
          choose a color
          <div
            v-if="variety.color"
            :style="`background-color: ${variety.color}`"
            class="selected-color"
          />
        </template>
        <RadioGroup
          :name="name"
          :items="colorOptions"
          :value="variety"
          @input="$store.commit('newProduct/setVarColor', {index, color: $event.color})"
          horizontal
        />
      </Dropdown>

      <div v-if="!$store.state.newProduct.inSizes" class="quantity">
        <label for="quantity">Quantity</label>
        <TextField
          id="quantity"
          :min="0"
          :value="variety.quantity"
          @change="$store.commit('newProduct/setVarQuantity', {index, quantity: $event})"
          type="number"
        />
      </div>
    </div>


    <div v-if="$store.state.newProduct.inSizes" class="sizes-wrapper">
      <label class="label">Sizes</label>
      <div class="sizes">
        <TextField 
          v-for="size in sizes"
          :key="size"
          :text="size"
          :value="variety.sizes[size]"
          @change="$store.commit('newProduct/setVarSizeQuantity', {index, size, quantity: $event})"
          item="text"
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
        @change="notifyVuex"
        handle="[data-move]"
        class="images"
      >
        <template v-if="hasFiles">
          <div v-for="(file, i) in dropzoneObject.files" :key="file.upload.uuid" class="image card with-image">
            <img :src="file.dataURL" :alt="file.name" />
            <div class="actions">
              <button
                @click="remove(i)"
                type="button"
                class="btn danger round"
                title="Remove image"
              >
                <img src="/images/product-edit/x.svg" />
              </button>
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
  import Dropdown from '../../components/ui/dropdown';
  import RadioGroup from '../../components/ui/radio-group';
  import Dropzone from 'nuxt-dropzone';
  import Button from '../../components/ui/button';
  import Draggable from 'vuedraggable';

  export default {
    name: 'ProductFormVariety',
    components: {
      Button,
      Dropdown,
      RadioGroup,
      TextField,
      Dropzone,
      Draggable,
    },
    props: {
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
      index: {
        type: Number,
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
        sizes: ['XS', 'S', 'M', 'L' , 'XL', 'XXL'],
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
      variety() {
        return this.$store.state.newProduct.varieties[this.index];
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
        this.notifyVuex();
      },
      notifyVuex() {
        this.$store.commit('newProduct/setVarFiles', {
          index: this.index,
          files: this.dropzoneObject.files.map(file => file.dataURL),
        });
      },
      thumbnail(/* file, dataURL */) {
        this.dropzoneObject.files.__ob__.dep.notify();
        this.notifyVuex();
      },
    },
  };
</script>

<style lang="scss" scoped>
.settings {
  justify-content: space-between;
}

.image-platform:not(.has-content) {
  background-color: #F6F6F6;
  cursor: pointer;
}

.selected-color {
  flex-shrink: 0;
}
</style>
