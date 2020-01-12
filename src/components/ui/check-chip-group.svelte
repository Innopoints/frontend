<script>
  import { createEventDispatcher } from 'svelte';
  import itemAmount from 'ui/utils/item-amount.js';

  export let classname = '';
  export let chipwrapperclass = '';
  export let chipclass = '';
  export let inputclass = '';
  export let small = false;
  export let outline = false;

  export let values;
  export let labels = null;
  export let name;
  export let maxChecked = null;
  $: currentChecked = values.reduce((acc, elt) => acc + elt.checked, 0);
  const titleObj = { title: `Can only select ${itemAmount(maxChecked, 'value')}.` };

  if (values.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && values.length !== labels.length) {
    console.error('Must have as many labels as there is values.');
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

<div role="group" class:max-reached={currentChecked === maxChecked} class={classname}>
  {#each values as loopValue, i (i)}
    <label class="chip-wrapper {chipwrapperclass}">
      <input
        bind:checked={loopValue.checked}
        value={loopValue.value}
        type="checkbox"
        disabled={loopValue.disabled}
        name={name}
        class={inputclass}
        on:click={(evt) => checkLimit(evt, loopValue)}
      />
      <div
        class="chip {chipclass}"
        class:small
        class:outline
        {...(currentChecked === maxChecked
          && !loopValue.checked
          && !loopValue.disabled ? titleObj : {})}
      >
        {labels === null ? loopValue.value : labels[i]}
      </div>
    </label>
  {/each}
</div>
