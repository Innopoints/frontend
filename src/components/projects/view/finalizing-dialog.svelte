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
    title="Finalize the project?"
    closeCallback={() => isOpen = false}
  >
    <svg slot="icon" src="images/icons/help-circle.svg" class="icon" />
    <p slot="content">
      This is usually done when all the volunteer work is completed. <br>
      In the finalizing stage you will be able to:
    </p>
    <ul slot="content" class="actual">
      <li>change actual working hours </li>
      <li>write up performance reports on volunteers</li>
      <li>send the project for the administrator's review</li>
    </ul>
    <p slot="content">
      Before you proceed, make sure to accept all volunteers who contributed. <br>
      Once the project is in the finalizing state, it may not be edited.
    </p>
    <div slot="content" class="actions">
      <Button on:click={() => isOpen = false}>
        no, wait
      </Button>
      <Button isFilled on:click={() => dispatch('confirm')}>
        yes, finalize
      </Button>
    </div>
  </Dialog>
</Modal>
