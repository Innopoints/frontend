<script>
  export let classname = 'labeled';
  export let labelclass = 'label';
  export let textclass = 'text';

  export let customContent = false;
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
      {#if customContent}
        <slot />
      {:else}
        <span>
          <slot />
        </span>
      {/if}
    </div>
  {:else}
    <span class={labelclass}>
      <slot name="label">{label}</slot>
    </span>
    {#if customContent}
      <slot />
    {:else}
      <span>
        <slot />
      </span>
    {/if}
  {/if}
</div>
