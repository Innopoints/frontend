<script>
  export let text = null;
  export let small = false;
</script>

<div class="empty" class:small>
  <div class="icon">
    <slot />
  </div>
  {#if text != null}
    <p class="title">{text}</p>
  {/if}
</div>

<style src="../../../static/css/components/common/empty-state.scss"></style>
