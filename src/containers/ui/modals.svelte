<script>
  import Card from 'ui/card.svelte';
  import Modal from 'ui/modal.svelte';
  import Button from 'ui/button.svelte';

  let m1 = false;
  let m2 = false;
</script>

<Card id="modals">
  <h1>Modals</h1>
  <div class="showcase vertical">
    <Button on:click={() => m1 = true}>open me</Button>
    <Button on:click={() => m2 = true}>and me</Button>
  </div>

  <Modal
    overlaydisplay="flex"
    classname="modal-overlay column dialog"
    bind:value={m1}
  >
    <span class="title">
      <svg src="/images/icons/award.svg" class="icon" />
      U Got Mail
    </span>
    <p>Text of the dialog here text text.</p>
    <div class="actions">
      <Button on:click={() => m1 = false}>cancel</Button>
      <Button isFilled>action</Button>
    </div>
  </Modal>

  <Modal
    classname="modal-overlay column dialog danger"
    overlaydisplay="flex"
    closebutton={false}
    bind:value={m2}
  >
    <span class="title">
      <svg src="/images/icons/alert-triangle.svg" class="icon" />
      Warning
    </span>
    <p>Something bad is about to happen. You just gonna let it roll?</p>
    <div class="actions">
      <Button on:click={() => m2 = false}>no, wait</Button>
      <Button isFilled isDanger>let's try</Button>
    </div>
  </Modal>
</Card>
