<script>
  import { createEventDispatcher } from 'svelte';

  export let id = null;
  export let classname = null;
  export let placeholder = '';
  export let name = null;
  export let type = null;
  export let value = null;
  export let cols = null;
  export let pattern = null;
  export let min = null;
  export let max = null;
  export let maxLength = null;
  export let label = null;
  export let error = null;
  export let text = null;
  export let item = null;
  export let multiline = null;
  export let outline = null;
  export let right = null;

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
      bind:value
      cols={5}
      on:focus={() => dispatch('focus')}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
      on:change={(e) => dispatch('change', e.target.value)}
    />
  {:else}
    <input
      {id}
      type="text"
      {placeholder}
      {name}
      {type}
      bind:value
      {pattern}
      {min}
      {max}
      {maxLength}
      on:focus={() => dispatch('focus')}
      on:blur={() => dispatch('blur')}
      on:input={() => dispatch('input')}
      on:keyup.enter={() => dispatch('blur')}
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
