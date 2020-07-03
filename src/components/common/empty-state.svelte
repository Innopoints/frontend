<script>
  export let text = null;
  export let subtext = null;
  export let small = false;
</script>

<div class="empty" class:small>
  {#if small}
    <div class="icon">
      <slot />
    </div>
    {#if text != null}
      <p class="title" class:prominent={subtext != null}>{text}</p>
    {/if}
    {#if subtext != null}
      <p class="subtitle">{subtext}</p>
    {/if}
  {:else}
    <slot />
  {/if}
</div>

<style src="../../../static/css/components/common/empty-state.scss"></style>
