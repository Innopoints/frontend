<script>
  export let classname = '';
  export let chipwrapperclass = '';
  export let chipclass = '';
  export let inputclass = '';
  export let small = false;
  export let outline = false;

  export let values;
  export let labels = null;
  export let value = null;
  export let name;

  if (values.length === 0) {
    console.error('Must have at least one value in the checkbox group.');
  }

  if (labels !== null && values.length !== labels.length) {
    console.error('Must have as many labels as there is values.');
  }
</script>

<div role="group" class={classname}>
  {#each values as loopValue, i (i)}
    <label class="chip-wrapper {chipwrapperclass}">
      <input
        bind:group={value}
        value={loopValue}
        type="radio"
        name={name}
        class={inputclass}
      />
      <div class="chip {chipclass}" class:small class:outline>
        {labels === null ? loopValue : labels[i]}
      </div>
    </label>
  {/each}
</div>
