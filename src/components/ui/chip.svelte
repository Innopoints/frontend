<script>
  import { createEventDispatcher } from 'svelte';

  export let classname = 'chip-wrapper';
  export let inputclass = '';
  export let chipclass = 'chip';
  export let isSmall = false;
  export let isOutline = false;

  export let label = '';
  export let name = '';
  export let disabled = false;
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
  <input
      checked={checked}
      name={name}
      disabled={disabled}
      type="{(multiple || disabled) ? 'checkbox' :'radio'}"
      class={inputclass}
      on:change={check}
  />
  <div
      class:unclickable={disabled}
      class:small={isSmall}
      class:outline={isOutline}
      class={chipclass}
  >
    <slot>{label}</slot>
  </div>
</label>
