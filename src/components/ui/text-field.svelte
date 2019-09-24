<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let placeholder;
  export let name;
  export let value;
  export let cols;
  export let pattern;
  export let min;
  export let max;
  export let maxLength;
  export let label;
  export let error;
  export let text;
  export let item;
  export let multiline;
  export let outline;
  export let right;

  $: classes = [
    'text-field',
    item && 'with-item',
    item && ((right && 'right') || 'left'),
    outline && 'outline',
  ];

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
      on:focus={() => dispatch('blur')}
      on:focus={() => dispatch('input')} />
  {:else}
    <!-- TODO: Bind <input> type -->
    <input
      {id}
      type="text"
      {placeholder}
      {name}
      bind:value
      {pattern}
      {min}
      {max}
      {maxLength}
      on:focus={() => dispatch('focus')}
      on:focus={() => dispatch('blur')}
      on:focus={() => dispatch('input')}
      on:keyup.enter={() => dispatch('blur')} />

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
