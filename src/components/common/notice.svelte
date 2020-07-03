<script>
  import { fly } from 'svelte/transition';

  export let warning = false;
</script>

<div class="notice" class:warning transition:fly={{ y: 10, duration: 100 }}>
  <div class="icon">
    <slot name="icon" />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style src="../../../static/css/components/common/notice.scss"></style>
