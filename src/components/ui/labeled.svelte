<script>
  export let classname = '';
  export let labelclass = '';
  export let textclass = '';

  export let label = '';
  export let icon = false;
</script>

<div class:text={!icon} class="labeled {classname}">
  {#if icon}
    <slot name="icon" />
    <div class="text {textclass}">
      <span class="label {labelclass}">
        <slot name="label">{label}</slot>
      </span>
      <slot />
    </div>
  {:else}
    <span class="label {labelclass}">
      <slot name="label">{label}</slot>
    </span>
    <slot />
  {/if}
</div>
