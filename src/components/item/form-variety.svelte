<script>
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import {item, changeVarietyQuantity, changeVarietySize, removeVariety} from '@/store/item';

  export let index;
  export let removable;
  export const colors = [];

  const sizes = ['XS', 'S', 'M', 'L' , 'XL', 'XXL'];
  const variety = $item.varieties[index];
</script>

<li class="variety">
  <div class="settings">
    <Dropdown label="open dropdown" chevron={false} dropdownclass="color-picker" btnclass="mb">
      <div role="group" class="color-choices" />
      <hr />
      <Button>
        <svg src="images/icons/plus.svg" class="icon mr" />
        add another color
      </Button>
    </Dropdown>
    <!--<Dropdown :chevron="false">
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
          @input="$store.commit('newProduct/setVarField', {index, key:'color', value: $event.color})"
          horizontal
      />
    </Dropdown>-->

    {#if !$item.inSizes}
      <div class="quantity">
        <label for="quantity">Quantity</label>
        <TextField
            id="quantity"
            min="0"
            bind:value={variety.quantity}
            on:change="{(e) => changeVarietyQuantity(index, e.detail)}"
            type="number"
        />
      </div>
    {/if}
  </div>

  {#if $item.inSizes}
    <div class="sizes-wrapper">
      <label class="label">Sizes</label>
      <div class="sizes">
        {#each sizes as size (size)}
          <TextField
              bind:value={variety.sizes[size]}
              on:change="{(e) => changeVarietySize(index, size, e.detail)}"
              item
              type="number"
              classname="right-align"
              placeholder="0"
          >
            <span class="item">{size}</span>
          </TextField>
        {/each}
      </div>
    </div>
  {/if}

  <!--<Dropzone
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
      <ImagePlaceholder />
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
              <X />
            </button>
            <button
                type="button"
                class="btn normal round"
                title="Move image"
                data-move
            >
              <Move />
            </button>
          </div>
        </div>
      </template>
    </Draggable>
  </Dropzone>-->

  {#if removable}
    <Button on:click="{() => removeVariety(index)}" danger>
      remove variety
    </Button>
  {/if}
</li>
