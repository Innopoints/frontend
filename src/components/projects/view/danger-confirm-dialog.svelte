<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';

  export let isOpen = false;
  export let textYes;
  export let eventDetail = null;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  <Dialog
    isDanger
    title="Warning"
    closeCallback={() => isOpen = false}
  >
    <svg slot="icon" src="images/icons/alert-triangle.svg" class="icon" />
    <p slot="content" class="constrain-width">
      <slot />
    </p>
    <div slot="content" class="actions">
      <Button on:click={() => { isOpen = false; dispatch('reject', eventDetail); }}>
        no, wait
      </Button>
      <Button isDanger isFilled on:click={() => dispatch('confirm', eventDetail)}>
        {textYes}
      </Button>
    </div>
  </Dialog>
</Modal>
