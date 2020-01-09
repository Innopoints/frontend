<script>
  import { createEventDispatcher } from 'svelte';

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
  let currentChecked = 0;
  values.forEach((elt) => currentChecked += elt.checked);
  let titleObj = { title: `Can only select ${maxChecked} value.` + (maxChecked !== 1 ? 's' : '') };

  if (values.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && values.length !== labels.length) {
    console.error('Must have as many labels as there is values.');
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
    } else {
      dispatch('change', evt);
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
        on:change={checkLimit}
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
