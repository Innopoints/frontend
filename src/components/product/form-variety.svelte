<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import DragDropzone from '@/components/product/drag-dropzone.svelte';
  import getColorPickerStyles from 'ui/utils/color-picker-styles.js';
  import { API_HOST } from '@/constants/env.js';

  export let variety;
  export let index;
  export let removable;
  export let colors;
  export let sizes;
  export let showSizes;

  const dispatch = createEventDispatcher();

  function changeField(field, value) {
    variety[field] = value;
    dispatch('change-variety', { index, variety });
  }

  function changeSizeAmount(size, value) {
    variety.sizes[size] = value;
    dispatch('change-variety', { index, variety });
  }

  let colorPicker = null;
  function openColorPicker() {
    colorPicker.click();
  }
</script>

<li class="variety">
  <div class="settings">
    <Dropdown
      chevron={false}
      dropdownclass="color-picker"
      handleclass="mb"
      let:toggle={toggle}
    >
      <span slot="label">
        choose a color
      </span>
      <div
        slot="label"
        class="selected-color"
        style={`${variety.color ? getColorPickerStyles(variety.color) : ''};
                display: ${variety.color ? 'block' : 'none'}`}
      />
      <RadioGroup
        isColor
        name="choose-color"
        values={colors}
        classname="color-choices"
        on:change={(e) => { changeField('color', e.detail); toggle(); }}
      />
      <hr />
      <Button on:click={openColorPicker}>
        <svg src="/images/icons/plus.svg" class="icon mr" />
        add another color
      </Button>
      <input
        type="color"
        bind:this={colorPicker}
        on:change={(e) => dispatch('new-color', e.target.value)}
        class="new-color-picker"
      >
    </Dropdown>

    {#if !showSizes}
      <div class="quantity">
        <label for="quantity" class="label">Quantity</label>
        <TextField
          id="quantity"
          min="0"
          placeholder="0"
          type="number"
          value={variety.quantity || ''}
          on:change={(e) => changeField('quantity', e.detail)}
        />
      </div>
    {/if}
  </div>

  {#if showSizes}
    <div class="sizes-wrapper">
      <label class="label">Sizes</label>
      <div class="sizes">
        {#each sizes as size (size)}
          <TextField
            isWithItem
            type="number"
            classname="right-align"
            placeholder="0"
            value={variety.sizes[size] || ''}
            on:change={(e) => changeSizeAmount(size, e.detail)}
          >
            <span class="item">{size}</span>
          </TextField>
        {/each}
      </div>
    </div>
  {/if}

  <DragDropzone
    images={variety.images.map(image => ({ url: API_HOST + image, file: { name: image } }))}
    {index}
    color={variety.color}
    on:new-file
    on:delete-file
    on:swap-files
  />

  {#if removable}
    <Button on:click="{() => dispatch('remove-variety', index)}" isDanger>
      remove variety
    </Button>
  {/if}
</li>
