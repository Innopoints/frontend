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

  let dispatch = createEventDispatcher();
  function onChange(evt) {
    value = this.checked ? second : first;
    dispatch('change', evt);
  }
</script>

<label class="clickable switch-wrapper {classname}">
  <input
      on:change={onChange}
      checked={value == second}
      name={name}
      on:focus
      class="switch-ctl {inputclass}"
      type="checkbox"
  />

  <slot name="first-state">
    <span class="state first {firstclass}">{first}</span>
  </slot>
  <!--TODO: add scoped styles for .two-state and .ml-2 or a way to rewrite these classes -->
  <div class="two-state switch {switchclass}">
    <div class="knob {knobclass}" />
  </div>
  <slot name="second-state">
    <span class="state second {secondclass}">{second}</span>
  </slot>
</label>
