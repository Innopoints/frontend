<script>
  import { createEventDispatcher } from 'svelte';

  export let classname = '';
  export let inputclass = '';
  export let knobclass = '';
  export let switchclass = '';
  export let firstclass = '';
  export let secondclass = '';

  export let name = '';
  export let first = '';
  export let second = '';
  export let value = first;
  $: value = (boolValue ? second : first);
  export let boolValue = false;

  const dispatch = createEventDispatcher();
  function onChange(evt) {
    boolValue = this.checked;
    dispatch('change', evt);
  }
</script>

<label class="clickable switch-wrapper {classname}">
  <input
    on:change={onChange}
    checked={boolValue}
    name={name}
    on:focus
    class="switch-ctl {inputclass}"
    type="checkbox"
  />

  <slot name="first-state">
    <span class="state first {firstclass}">{first}</span>
  </slot>
  <div class="two-state switch {switchclass}">
    <div class="knob {knobclass}" />
  </div>
  <slot name="second-state">
    <span class="state second {secondclass}">{second}</span>
  </slot>
</label>
