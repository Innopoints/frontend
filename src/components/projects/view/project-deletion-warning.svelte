<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';

  export let isOpen = false;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  <Dialog
    isDanger
    title="Warning"
    closeCallback={() => isOpen = false}
  >
    <svg slot="icon" src="/images/icons/alert-triangle.svg" class="icon" />
    <p slot="content">
      Deleting a project is rarely desired. <br />
      You may edit the project or delete individual activities instead. <br />
      Think twice before proceeding.
    </p>
    <div slot="content" class="actions">
      <Button on:click={() => isOpen = false}>
        no, wait
      </Button>
      <Button isDanger isFilled on:click={() => dispatch('confirm-deletion')}>
        yes, delete
      </Button>
    </div>
  </Dialog>
</Modal>
