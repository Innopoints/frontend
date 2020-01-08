<script>
  import getColorPickerStyles from './utils/color-picker-styles.js';

  export let classname = '';
  export let wrapperclass = 'radio';
  export let radioclass = 'radio';
  export let inputclass = '';
  export let labelclass = null;
  export let iconclass = 'icon';
  export let isColor = false;

  export let values;
  export let labels = null;
  export let value = null;
  export let name;
  export let labelPosition = 'right';

  if (values.length === 0) {
    throw new Error('Must have at least one item in the radio group.');
  }

  if (labels !== null && values.length !== labels.length) {
    throw new Error('Must have as many labels as there is values.');
  }

  if (labelPosition !== 'right' && labelPosition !== 'left') {
    throw new Error('Label position must be either left or right.');
  }
</script>

<div class:with-labels={!isColor} class={classname} role="group">
  {#each values as loopValue, i (i)}
    <label class:colored={isColor} class:clickable={!isColor} class={wrapperclass}>
      {#if !isColor && labelPosition === 'left'}
        {#if labelclass !== null}
          <span class={labelclass}>{labels === null ? loopValue : labels[i]}</span>
        {:else}
          {labels === null ? loopValue : labels[i]}
        {/if}
      {/if}
      {#if !isColor}
        <div class={radioclass}>
          <input
              bind:group={value}
              value={loopValue}
              type="radio"
              name={name}
              class={inputclass}
          >
          <div
            style="{isColor ? getColorPickerStyles(loopValue) : ''}"
            class="icon {iconclass}"></div>
        </div>
      {:else}
        <input
            bind:group={value}
            value={loopValue}
            type="radio"
            name={name}
            class={inputclass}
        >
        <div
          style="{isColor ? getColorPickerStyles(loopValue) : ''}"
          class="icon {iconclass}"></div>
      {/if}
      {#if !isColor && labelPosition === 'right'}
        {#if labelclass !== null}
          <span class={labelclass}>{labels === null ? loopValue : labels[i]}</span>
        {:else}
          {labels === null ? loopValue : labels[i]}
        {/if}
      {/if}
    </label>
  {/each}
</div>
