<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Dialog, Modal } from 'attractions';

  export let open = false;
  export let textYes;
  export let eventDetail = null;

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open let:closeCallback>
  <Dialog danger title="Warning" {closeCallback} constrainWidth>
    <svg slot="title-icon" src="images/icons/alert-triangle.svg" class="icon" />
    <p>
      <slot />
    </p>
    <div class="actions">
      <Button on:click={() => { open = false; dispatch('reject', eventDetail); }}>
        no, wait
      </Button>
      <Button danger filled on:click={() => { open = false; dispatch('confirm', eventDetail); }}>
        {textYes}
      </Button>
    </div>
  </Dialog>
</Modal>
