<script>
  import { createEventDispatcher } from 'svelte';
  import getColorPickerStyles from './utils/color-picker-styles.js';

  export let classname = '';
  export let wrapperclass = '';
  export let checkboxclass = '';
  export let inputclass = '';
  export let labelclass = null;
  export let iconclass = '';
  export let isColor = false;
  export let isRound = false;

  export let values;
  export let labels = null;
  export let name;
  export let labelPosition = 'right';
  export let maxChecked = null;
  let currentChecked = 0;
  values.forEach((elt) => currentChecked += elt.checked);

  if (values.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && values.length !== labels.length) {
    console.error('Must have as many labels as there is values.');
  }

  if (labelPosition !== 'right' && labelPosition !== 'left') {
    console.error('Label position must be either left or right.');
  }

  const dispatch = createEventDispatcher();
  function checkLimit(evt) {
    currentChecked += (this.checked ? 1 : -1);
    if (maxChecked !== null && currentChecked > maxChecked) {
      this.checked = false;
      for (let val of values) {
        if (val.value == this.value) {
          val.checked = false;
          values = values;  // Invalidate the values;
          break;
        }
      }
      currentChecked--;
      return false;
    }
    return true;
  }
</script>

<div class:with-labels={!isColor} class={classname} role="group">
  {#each values as loopValue, i (i)}
    <label class:clickable={!isColor} class={wrapperclass}>
      {#if !isColor && labelPosition === 'left'}
        {#if labelclass !== null}
          <span class={labelclass}>{labels === null ? loopValue.value : labels[i]}</span>
        {:else}
          {labels === null ? loopValue.value : labels[i]}
        {/if}
      {/if}
      <div class:colored={isColor} class:round={isRound} class="checkbox {checkboxclass}">
        <input
            bind:checked={loopValue.checked}
            value={loopValue.value}
            type="checkbox"
            name={name}
            class={inputclass}
            on:change={(evt) => { checkLimit(evt) && dispatch('change', loopValue); }}
        >
        <div
          style="{isColor ? getColorPickerStyles(loopValue.value) : ''}"
          class="icon {iconclass}"></div>
      </div>
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
