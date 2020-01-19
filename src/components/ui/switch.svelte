<script>
  export let classname = '';
  export let labelclass = null;
  export let inputclass = '';
  export let knobclass = 'knob';
  export let switchclass = '';

  export let name = '';
  export let disabled = false;
  export let label;
  export let value = false;
</script>

<style>
  .switch {
    margin-left: 1em;
  }
</style>

<label class="switch-wrapper clickable {classname}">
  {#if labelclass !== null}
    <span class={labelclass}>
      {label}
    </span>
  {:else}
    {label}
  {/if}

  <input
    bind:checked={value}
    name={name}
    on:change
    on:focus
    class="switch-ctl {inputclass}"
    type="checkbox"
    {disabled}
  />

  <div class="switch {switchclass}">
    <div class="knob {knobclass}" />
  </div>
</label>
