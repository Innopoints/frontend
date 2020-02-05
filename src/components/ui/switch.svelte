<script>
  export let classname = '';
  export let labelclass = null;
  export let inputclass = '';
  export let knobclass = 'knob';
  export let switchclass = '';

  export let name = '';
  export let disabled = false;
  export let label = null;
  export let value = false;
</script>

<label class="switch-wrapper clickable {classname}">
  {#if label != null}
    {#if labelclass !== null}
      <span class={labelclass}>
        {label}
      </span>
    {:else}
      {label}
    {/if}
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

  <div class="switch {label == null ? switchclass : switchclass + ' ml-2'}">
    <div class="knob {knobclass}" />
  </div>
</label>
