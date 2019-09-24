<script>
  export let label;
  export let icon;
</script>

<div class:text={!icon} class="labeled">
  {#if icon}
    <slot name="icon" />
    <div class="text">
      <span class="label">{label}</span>
      <span>
        <slot />
      </span>
    </div>
  {:else}
    <span class="label">{label}</span>
    <span>
      <slot />
    </span>
  {/if}
</div>
