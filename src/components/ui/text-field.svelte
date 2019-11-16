<script>
  import { createEventDispatcher } from 'svelte';

  export let id = null;
  export let classname = null;
  export let placeholder = '';
  export let name = null;
  export let type = 'text';
  export let value = null;
  export let pattern = null;
  export let min = null;
  export let max = null;
  export let maxLength = null;
  export let label = null;
  export let error = null;
  export let item = null;
  export let multiline = null;
  export let outline = null;
  export let right = null;
  export const cols = null;

  $: val = value;
  $: classes = [
    'text-field',
    classname && classname,
    item && 'with-item',
    item && ((right && 'right') || 'left'),
    outline && 'outline',
  ].filter(v => v !== false);

  let dispatch = createEventDispatcher();
</script>

<div class={classes.join(' ')}>
  {#if multiline}
    <textarea
      {id}
      {placeholder}
      {name}
      bind:value={val}
      cols={5}
      on:focus={(e) => dispatch('focus', e.target.value)}
      on:blur={(e) => dispatch('blur', e.target.value)}
      on:input={(e) => dispatch('input', e.target.value)}
      on:change={(e) => dispatch('change', e.target.value)}
    />
  {:else}
    <input
        {id}
        type="number"
        {placeholder}
        {name}
        {type}
        value={val}
        {pattern}
        {min}
        {max}
        {maxLength}
        on:focus={(e) => dispatch('focus', e.target.value)}
        on:blur={(e) => dispatch('blur', e.target.value)}
        on:input={(e) => dispatch('input', e.target.value)}
        on:keyup.enter={(e) => dispatch('change', e.target.value)}
        on:change={(e) => dispatch('change', e.target.value)}
    />

    {#if outline}
      <label for={id} class="label">{label}</label>
    {/if}

    {#if item}
      <slot />
    {/if}

    {#if pattern}
      <span class="error">{error}</span>
    {/if}
  {/if}
</div>
