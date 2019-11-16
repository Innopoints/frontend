<script>
  import { createEventDispatcher } from 'svelte';

  export let classname = null;
  export let isOutline = false;
  export let isWithItem = false;
  export let isItemRight = false;

  export let id = null;
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
  export let multiline = null;
  export let cols = 5;

  let dispatch = createEventDispatcher();
</script>

<div
    class:with-item={isWithItem}
    class:outline={isOutline}
    class="text-field {classname} {isWithItem ? (isItemRight ? 'right' : 'left') : ''}"
>
  {#if multiline}
    <textarea
      {id}
      {placeholder}
      {name}
      bind:value={value}
      {cols}
      on:focus={(e) => dispatch('focus', e.target.value)}
      on:blur={(e) => dispatch('blur', e.target.value)}
      on:input={(e) => dispatch('input', e.target.value)}
      on:change={(e) => dispatch('change', e.target.value)}
    />
  {:else}
    <input
        {id}
        {placeholder}
        {name}
        {type}
        value={value}
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

    {#if isOutline}
      <label for={id} class="label">
        <slot name="label">{label}</slot>
      </label>
    {/if}

    {#if isWithItem}
      <slot />
    {/if}

    {#if pattern}
      <span class="error">
        <slot name="error">{error}</slot>
      </span>
    {/if}
  {/if}
</div>
