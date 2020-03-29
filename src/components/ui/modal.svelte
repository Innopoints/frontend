<script>
  export let classname = '';
  export let isOpen = false;
</script>

<div class:open={isOpen} class="modal-overlay {classname}">
  {#if isOpen}
    <slot />
  {/if}
</div>
