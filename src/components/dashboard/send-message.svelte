<script>
  import { getContext } from 'svelte';
  import { TextField, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import * as api from 'src/utils/api.js';

  export let users = [];
  export let account;

  let text = null;

  async function send() {
    if (!text) {
      return;
    }

    try {
      const promises = users.map(user => api.json(api.post(`/accounts/${user.email}/notify`, {
        data: {
          message: text,
        },
        csrfToken: account.csrf_token,
      })));
      await Promise.all(promises);
      showSnackbar({ props: { text: 'Successfully sent the message' } });
      text = '';
    } catch (e) {
      console.error(e);
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="send-message">
  <header>
    <svg src="static/images/icons/message-circle.svg" class="icon mr-2" />
    Send a message
  </header>
  <div class="form">
    <TextField
      bind:value={text}
      multiline
      maxlength={512}
      cols="5"
      id="send-message"
    />
    <div class="actions">
      <Button disabled={!text || users.length === 0} on:click={send}>
        <svg src="static/images/icons/send.svg" class="mr" />
        send
      </Button>
    </div>
  </div>
</div>

<style src="../../../static/css/components/dashboard/send-message.scss"></style>
