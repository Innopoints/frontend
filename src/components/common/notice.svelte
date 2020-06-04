<script>
  import { fly } from 'svelte/transition';
</script>

<div class="notice" transition:fly={{ y: 10, duration: 100 }}>
  <div class="icon">
    <slot name="icon" />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style src="../../../static/css/components/common/notice.scss"></style>
