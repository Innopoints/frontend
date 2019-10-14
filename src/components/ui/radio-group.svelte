<script>
  import { createEventDispatcher } from 'svelte';

  export let items;
  export let name;
  export let classname = null;
  export let selected = {};
  export let isColor = false;
  export let isLabel = false;
  export let isLabelGreen = false;
  export let labelPosition = 'right';
  export let labelClass = null;

  $: selectedId = selected.id + 1 || null;

  let dispatch = createEventDispatcher();
  const changeRadio = item => {
    selectedId = item.id + 1;
    dispatch('change', item);
  };

  const isWhite = item => {
    if (!item.color || !isColor) return false;
    if (item.color.toUpperCase() === '#FFF' || item.color.toUpperCase() === '#FFFFFF') return true;
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

<div class:with-labels={isLabel} class={classname} role="group">
  {#each items as item, i (i)}
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
              checked="{selectedId === item.id + 1}"
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
            checked="{selectedId === item.id + 1}"
        >
        <div class:white={isWhite(item)} style="{style(item)}" class="icon"></div>
      {/if}
    </label>
  {/each}
</div>
