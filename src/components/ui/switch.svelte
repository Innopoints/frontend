<script>
  import { createEventDispatcher } from 'svelte';

  export let classname = 'clickable switch-wrapper';
  export let inputclass = 'switch-ctl';
  export let knobclass = 'knob';
  export let switchclass = 'switch';
  export let firstclass = 'state first';
  export let secondclass = 'state second';
  export let isTwoState = false;

  export let id = '';
  export let name = '';
  export let first = '';
  export let second = '';
  export let value = false;

  let dispatch = createEventDispatcher();
</script>

<label class={classname} for={id}>
  {#if !isTwoState}
    <slot />
  {/if}

  <input
      {id}
      checked={value}
      name={name}
      on:change="{(e) => dispatch('change', e.target.checked)}"
      on:focus="{(e) => dispatch('focus', e)}"
      class:first={isTwoState}
      class={inputclass}
      type="checkbox"
  />

  {#if isTwoState}
    <slot name="first-state">
      <span class={firstclass}>{first}</span>
    </slot>
  {/if}
  <!--TODO: add scoped styles for .two-state and .ml-2 or a way to rewrite these classes -->
  <div class="{(isTwoState ? 'two-state' : 'ml-2')} {switchclass}">
    <div class={knobclass} />
  </div>
  {#if isTwoState}
    <slot name="second-state">
      <span class={secondclass}>{second}</span>
    </slot>
  {/if}
</label>
