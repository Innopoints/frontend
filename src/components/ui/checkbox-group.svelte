<script>
  import { createEventDispatcher } from 'svelte';

  export let name = '';
  export let classname = '';
  export let labelclass = '';
  export let checkboxclass = '';
  export let labeled = false;
  export let colored = false;
  export let items = [];
  export let checked = [];

  $: selected = checked;

  let dispatch = createEventDispatcher();
  const changeCheckbox = item => {
    if (selected.some(x => x.id === item.id)) selected = selected.filter(x => x.id !== item.id);
    else selected.push(item);
    dispatch('change', selected);
  };

  const isWhite = item => {
    if (!item.color || !colored) return false;
    return item.color.toUpperCase() === '#FFF' || item.color.toUpperCase() === '#FFFFFF';
  };
  const style = item => {
    if (!colored || !item.color || isWhite(item)) return '';

    // Parse HEX colors
    let outline = '';
    let match = item.color.toUpperCase().match(/#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/);
    if(match) {
      outline = `
            --r: ${parseInt(match[1], 16)};
            --g: ${parseInt(match[2], 16)};
            --b: ${parseInt(match[3], 16)};
          `;
    }

    return `
          background-color: ${item.color};
          border-color: ${item.color};
          ${outline}
        `;
  };
</script>

<style>
  .checkbox .icon.white {
    background-color: #fff !important;
    border-color: #999 !important;
    --r: 153;
    --g: 153;
    --b: 153;
  }

  .checkbox .icon.white::before {
    border-color: #999 !important;
  }
</style>

<div role="group" class:with-labels={labeled} class={classname}>
  {#each items as item (item.id)}
    <label class:clickable={labeled} class={labelclass}>
      <div class:colored={colored} class:round={colored} class="checkbox {checkboxclass}">
        <input
            on:change={() => changeCheckbox(item)}
            type="checkbox"
            checked={selected.some(x => x.id === item.id)}
            name={name}
        >
        <div class:white={isWhite(item)} style="{style(item)}" class="icon" />
      </div>
      {(labeled && item.label) ? item.label : ''}
    </label>
  {/each}
  <slot />
</div>
