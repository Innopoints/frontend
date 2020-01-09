<script>
  export let classname = '';
  export let tabclass = '';
  export let iconclass = '';
  export let inputclass = '';

  export let values;
  export let value = null;
  export let labels = null;
  export let name;

  if (values.length === 0) {
    console.error('Must have at least one item in the radio group.');
  }

  if (labels !== null && values.length !== labels.length) {
    console.error('Must have as many labels as there is values.');
  }
</script>

<nav class="tabs {classname}">
  {#each values as loopValue, i (i)}
    <label class="tab {tabclass}">
      <input type="radio" {name} class={inputclass} bind:group={value} value={loopValue} />
      <div class="icon {iconclass}">{labels === null ? loopValue : labels[i]}</div>
    </label>
  {/each}
</nav>
