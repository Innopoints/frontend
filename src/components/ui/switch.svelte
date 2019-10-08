<script>
  import { createEventDispatcher } from 'svelte';

  export let id = '';
  export let name = '';
  export let first = '';
  export let second = '';
  export let checked = false;
  export let twoState = false;

  let dispatch = createEventDispatcher();
</script>

<label class="clickable switch-wrapper" for={id}>
  {#if !twoState}
    <slot />
  {/if}

  <input
      {id}
      {checked}
      name={name}
      on:change="{(e) => dispatch('change', e.target.value)}"
      class:first={twoState}
      class="switch-ctl"
      type="checkbox"
  />

  {#if twoState}<span class="state first">{first}</span>{/if}
  <div class="{(twoState ? 'two-state' : 'ml-2') + ' switch'}">
    <div class="knob" />
  </div>
  {#if twoState}<span class="state second">{second}</span>{/if}
</label>
