<script>
  import { createEventDispatcher } from 'svelte';
  import parseItems from './utils/parse-items-array';
  import parseValues from './utils/parse-values';

  export let items;
  export let name;
  export let classname = null;
  export let value = {};
  export let uniqueKey = null;
  export let isColor = false;
  export let isLabel = false;
  export let isLabelGreen = false;
  export let labelPosition = 'right';
  export let labelClass = null;

  $: parsedItems = parseItems(items);
  $: selected = parseValues(value, parsedItems, {uniqueKey});

  let dispatch = createEventDispatcher();
  const changeRadio = item => {
    selected = item;
    dispatch('change', item);
  };

  const isWhite = item => {
    if (!item.color || !isColor) return false;
    return item.color.toUpperCase() === '#FFF' || item.color.toUpperCase() === '#FFFFFF';
  };
  const style = item => {
    if (!isColor || !item.color || isWhite(item)) return '';

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
  .radio .icon.white {
    background-color: #fff !important;
    border-color: #999 !important;
    --r: 153;
    --g: 153;
    --b: 153;
  }

  .radio .icon.white::before {
    background: #999 !important;
  }
</style>

<div class:with-labels={isLabel} class={classname} role="group">
  {#each parsedItems as item, i (i)}
    <label class:colored={isColor} class:clickable={isLabel} class={labelClass}>
      {#if isLabel}
        {#if labelPosition === 'left'}
          {#if isLabelGreen}
            <span class="label">{item.label}</span>
          {:else}
            {item.label}
          {/if}
        {/if}

        <div class="radio">
          <input
              on:change="{() => changeRadio(item)}"
              type="radio"
              name={name}
              checked="{selected.id === item.id}"
          >
          <div class:white={isWhite(item)} style="{style(item)}" class="icon"></div>
        </div>

        {#if labelPosition === 'right'}
          {#if isLabelGreen}
            <span class="label">{item.label}</span>
          {:else}
            {item.label}
          {/if}
        {/if}

      {:else}
        <input
            on:change="{() => changeRadio(item)}"
            type="radio"
            name={name}
            checked="{selected.id === item.id}"
        >
        <div class:white={isWhite(item)} style="{style(item)}" class="icon"></div>
      {/if}
    </label>
  {/each}
</div>
