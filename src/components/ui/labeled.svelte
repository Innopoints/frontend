<script>
  export let classname = '';
  export let labelclass = 'label';

  export let label = '';
  export let icon = false;
</script>

<div class:text={!icon} class="labeled {classname}">
  {#if icon}
    <slot name="icon" />
    <div class="text">
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
