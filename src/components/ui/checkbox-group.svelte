<script>
  import { createEventDispatcher } from 'svelte';
  import getColorPickerStyles from './utils/color-picker-styles.js';
  import itemAmount from 'ui/utils/item-amount.js';

  export let classname = '';
  export let wrapperclass = '';
  export let checkboxclass = '';
  export let inputclass = '';
  export let labelclass = null;
  export let iconclass = '';
  export let isColor = false;
  export let isRound = false;

  export let items;
  export let labels = null;
  export let name;
  export let labelPosition = 'right';
  export let maxChecked = null;
  $: currentChecked = items.reduce((acc, elt) => acc + elt.checked, 0);
  const titleObj = { title: `Can only select ${itemAmount(maxChecked, 'value')}.` };

  if (items.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && items.length !== labels.length) {
    console.error('Must have as many labels as there is items.');
  }

  if (labelPosition !== 'right' && labelPosition !== 'left') {
    console.error('Label position must be either left or right.');
  }

  const dispatch = createEventDispatcher();
  function checkLimit(evt, value) {
    if (maxChecked !== null && currentChecked + evt.target.checked > maxChecked) {
      evt.preventDefault();
    } else {
      value.checked = !value.checked;
      dispatch('change', value);
    }
  }
</script>

<div
  class:with-labels={!isColor}
  class:max-reached={currentChecked === maxChecked}
  class={classname}
  role="group"
>
  {#each items as loopValue, i (i)}
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
          on:click={(evt) => checkLimit(evt, loopValue)}
        >
        <div
          style="{isColor ? getColorPickerStyles(loopValue.value) : ''}"
          class="icon {iconclass}"
          {...(currentChecked === maxChecked
            && !loopValue.checked
            && !loopValue.disabled ? titleObj : {})}
        ></div>
      </div>
      {#if !isColor && labelPosition === 'right'}
        {#if labelclass !== null}
          <span class={labelclass}>{labels === null ? loopValue.value : labels[i]}</span>
        {:else}
          {labels === null ? loopValue.value : labels[i]}
        {/if}
      {/if}
    </label>
  {/each}
</div>
