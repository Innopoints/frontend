<script>
  import sizes from '@/constants/item/sizes';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import DragDropzone from '@/components/item/drag-dropzone.svelte';
  import {item, changeVarietySize, removeVariety, changeVarietyField, colors, customColors, addNewColor} from '@/store/item';

  export let index;
  export let removable;

  let colorPicker = null;

  $: variety = $item.varieties[index];
  const chooseColor = e => {
    changeVarietyField(index, 'color', e.detail.color);
  };

  const openColorPicker = () => colorPicker.click();
</script>

<style>
  #new-color-picker {
    display: none;
  }
</style>

<li class="variety">
  <div class="settings">
    <Dropdown
        chevron={false}
        dropdownclass="dropdown color-picker"
        btnclass="mb handle btn"
    >
      <span slot="label">
        choose a color
      </span>
      <div slot="label" class="selected-color" style={'background-color:' + variety.color} />
      <RadioGroup
          isColor
          name="choose-color"
          items={$colors.concat(Object.values($customColors))}
          classname="color-choices"
          on:change={chooseColor}
      />
      <hr />
      <Button on:click={openColorPicker}>
        <svg src="/images/icons/plus.svg" class="icon mr" />
        add another color
      </Button>
      <input
          on:change={(e) => addNewColor(index, e.target.value)}
          type="color"
          bind:this={colorPicker}
          id="new-color-picker"
      >
    </Dropdown>

    {#if !$item.inSizes}
      <div class="quantity">
        <label for="quantity">Quantity</label>
        <TextField
            id="quantity"
            min="0"
            bind:value={variety.quantity}
            on:change="{(e) => changeVarietyField(index, 'quantity', e.detail)}"
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
              isWithItem
              type="number"
              classname="right-align text-field"
              placeholder="0"
          >
            <span class="item">{size}</span>
          </TextField>
        {/each}
      </div>
    </div>
  {/if}

  <DragDropzone files={variety.images} {index} />

  {#if removable}
    <Button on:click="{() => removeVariety(index)}" isDanger>
      remove variety
    </Button>
  {/if}
</li>
