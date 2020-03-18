<script>
  import rippleEffect from './utils/ripple';
  import { createEventDispatcher } from 'svelte';
  export let classname = '';
  export let chipwrapperclass = '';
  export let chipclass = '';
  export let inputclass = '';
  export let small = false;
  export let outline = false;

  export let items;
  export let labels = null;
  export let value = null;
  export let name;

  if (items.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && items.length !== labels.length) {
    console.error('Must have as many labels as there is items.');
  }

  const dispatch = createEventDispatcher();
  function newSelection() {
    dispatch('change', value);
  }
</script>

<div role="group" class={classname}>
  {#each items as loopValue, i (i)}
    <label class="chip-wrapper {chipwrapperclass}">
      <input
        bind:group={value}
        value={loopValue}
        type="radio"
        name={name}
        class={inputclass}
        on:change={newSelection}
      />
      <div class="chip {chipclass}" class:small class:outline use:rippleEffect>
        {labels === null ? loopValue : labels[i]}
      </div>
    </label>
  {/each}
</div>
