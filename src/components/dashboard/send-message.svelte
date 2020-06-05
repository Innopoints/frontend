<script>
  import TextField from 'ui/text-field.svelte';
  import Button from 'ui/button.svelte';
  import { post } from '@/utils/api.js';

  export let users = [];
  let success = false;
  let text = null;
  let error = null;

  async function send() {
    if (!text) return;
    try {
      const responses = await Promise.all(users.map(user => post(`/accounts/${user.email}/notify`, {
        data: {
          message: text,
        },
      })));
      if (!responses.every(res => res.ok)) throw 'Failed to send notifications';
      text = null;
      error = null;
      success = true;
      setTimeout(() => success = false, 1500);
    } catch (e) {
      success = false;
      error = e;
    }
  }
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
      maxlength={512}
      cols="5"
      on:input={() => { success = false; error = null; }}
    />
    <div class="actions">
      <Button disabled={!text} on:click={send}>
        <svg src="/images/icons/send.svg" class="icon mr" />
        send
      </Button>
      {#if success}
        <span class="status good">success!</span>
      {:else if error}
        <span class="status bad">failed, please, retry :(</span>
      {/if}
    </div>
  </form>
</div>
