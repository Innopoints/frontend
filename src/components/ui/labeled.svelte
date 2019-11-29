<script>
  export let classname = 'labeled';
  export let labelclass = 'label';
  export let textclass = 'text';

  export let label = '';
  export let icon = false;
</script>

<div class:text={!icon} class={classname}>
  {#if icon}
    <slot name="icon" />
    <div class={textclass}>
      <span class={labelclass}>
        <slot name="label">{label}</slot>
      </span>
      <span>
        <slot />
      </span>
    </div>
  {:else}
    <span class={labelclass}>
      <slot name="label">{label}</slot>
    </span>
    <span>
      <slot />
    </span>
  {/if}
</div>
