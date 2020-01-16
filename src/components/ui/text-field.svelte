<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let classname = '';
  export let inputclass = '';
  export let labelclass = '';
  export let errorclass = '';

  export let isOutline = false;
  export let isWithItem = false;
  export let isItemRight = false;
  export let isNoSpinner = false;

  export let id = null;
  export let placeholder = '';
  export let name = null;
  export let type = 'text';
  export let value = null;
  export let pattern = null;
  export let minlength = null;
  export let maxlength = null;
  export let min = null;
  export let max = null;
  export let label = null;
  export let error = null;
  export let multiline = null;
  export let cols = 5;
  export let changeTimeout = 400;
  export let autofocus = false;

  const dispatch = createEventDispatcher();
  let timeout = null;
  const delayedChange = (e) => {
    dispatch('change', e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch('delayedChange', e.target.value);
    }, changeTimeout);
  };

  let inputElement;
  onMount(() => {
    if (autofocus) {
      inputElement.focus();
    }
  });
</script>

<div
    class="text-field {classname}"
    class:outline={isOutline}
    class:with-item={isWithItem}
    class:left={isWithItem && !isItemRight}
    class:right={isWithItem && isItemRight}
    class:no-spinner={isNoSpinner}
>
  {#if multiline}
    <textarea
      {id}
      {placeholder}
      {name}
      bind:value={value}
      {cols}
      class={inputclass}
      on:focus={() => dispatch('focus', value)}
      on:blur={() => dispatch('blur', value)}
      on:input={() => dispatch('input', value)}
      on:change={delayedChange}
      bind:this={inputElement}
    />
  {:else}
    {#if type === 'number'}
      <input
        {id}
        {placeholder}
        {name}
        type="number"
        bind:value={value}
        {pattern}
        {min}
        {max}
        {minlength}
        {maxlength}
        class={inputclass}
        on:focus={(e) => dispatch('focus', e.target.value)}
        on:blur={(e) => dispatch('blur', e.target.value)}
        on:input={(e) => dispatch('input', e.target.value)}
        on:change={delayedChange}
        bind:this={inputElement}
      />
    {:else}
      <input
        {id}
        {placeholder}
        {name}
        {type}
        {value}
        {pattern}
        {minlength}
        {maxlength}
        class={inputclass}
        on:focus={(e) => dispatch('focus', e.target.value)}
        on:blur={(e) => dispatch('blur', e.target.value)}
        on:input={(e) => { value = e.target.value; dispatch('input', e.target.value); }}
        on:change={delayedChange}
        bind:this={inputElement}
      />
    {/if}

    {#if isOutline}
      <label for={id} class="label {labelclass}">
        <slot name="label">{label}</slot>
      </label>
    {/if}

    {#if isWithItem}
      <slot />
    {/if}

    {#if pattern}
      <span class="error {errorclass}">
        <slot name="error">{error}</slot>
      </span>
    {/if}
  {/if}
</div>
