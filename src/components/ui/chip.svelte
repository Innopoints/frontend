<script>
  import { createEventDispatcher } from 'svelte';

  export let classname = 'chip-wrapper';
  export let inputclass = '';
  export let chipclass = 'chip';

  export let label = '';
  export let name = '';
  export let disabled = false;
  export let small = false;
  export let outline = false;
  export let multiple = false;
  export let value = null;

  $: checked = value;

  let dispatch = createEventDispatcher();
  const check = () => {
    checked = !checked;
    dispatch('change', checked);
  };
</script>

<label class={classname}>
  {#if !disabled}
    <input
        checked={checked}
        name={name}
        disabled={disabled}
        type="{(multiple || disabled) ? 'checkbox' :'radio'}"
        class={inputclass}
        on:change={check}
    />
  {/if}
  <div
      class:unclickable={disabled}
      class:small={small}
      class:outline={outline}
      class={chipclass}
  >
    <slot>{label}</slot>
  </div>
</label>
