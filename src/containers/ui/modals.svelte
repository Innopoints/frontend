<script>
  import Modal from 'ui/modal.svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import { fade } from 'svelte/transition';

  export let m1 = false;
  export let m2 = false;

  function closeM1() { m1 = false; }
  function closeM2() { m2 = false; }
</script>

<Modal bind:isOpen={m1}>
  <Dialog isDanger title="Are you sure you want to?" closeCallback={closeM1} transition={fade}>
    <svg slot="icon" src="/images/icons/alert-triangle.svg" class="icon" />
    <div slot="content" class="content">
      <p>You might not want to.</p>
      <div class="actions">
        <Button on:click={closeM1}>cancel</Button>
        <Button isFilled isDanger>i want to</Button>
      </div>
    </div>
  </Dialog>
</Modal>

<Modal bind:isOpen={m2}>
  <Dialog title="U Got Mail" closeCallback={closeM2} transition={null}>
    <svg slot="icon" src="/images/icons/award.svg" class="icon" />
    <div slot="content" class="content">
      <p>Text of the dialog here text text.</p>
      <div class="actions">
        <Button on:click={closeM2}>cancel</Button>
        <Button isFilled>action</Button>
      </div>
    </div>
  </Dialog>
</Modal>
