<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';

  export let users = [];
  $: {
    if (users.length) success = false;
  }
  let success = false;
  let text = null;

  const send = () => {
    text = null;
    success = true;
  };
</script>

<div class="send-message">
  <header>
    <svg src="/images/icons/message-circle.svg" class="icon mr-2" />
    Send a message
  </header>
  <form>
    <TextField
      bind:value={text}
      multiline
      cols="5"
      on:input={() => success = false}
    />
    <div class="actions">
      <Button disabled={!text} on:click={send}>
        <svg src="/images/icons/send.svg" class="icon mr" />
        send
      </Button>
      {#if success}
        <span class="status good">success!</span>
      {/if}
      <span class="status bad" style="display: none;">failed, please, retry :(</span>
    </div>
  </form>
</div>
