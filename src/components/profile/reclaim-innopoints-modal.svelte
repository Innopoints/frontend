<script>
  import { getContext } from 'svelte';
  import { Button, Dialog, Modal, TextField } from 'attractions';
  import { snackbarContextKey } from 'attractions/src/snackbar';
  import * as api from '@/utils/api.js';

  export let open = false;
  export let account;
  let email = null;
  let password = null;

  async function sendRequest() {
    try {
      const resp = await api.post(
        '/reclaim-innopoints',
        { data: { email, password }, csrfToken: account.csrf_token },
      );

      if (resp.status === 403) {
        showSnackbar({ props: { text: 'Incorrect e-mail, username or password' }});
      } else if (!resp.ok) {
        showSnackbar({ props: { text: 'Something went wrong' }});
      } else {
        account.balance += await resp.json();
        email = null;
        password = null;
        open = false;
        showSnackbar({ props: { text: 'Innopoints successfully transferred!' }});
      }
    } catch (e) {
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Modal bind:open let:closeCallback>
  <Dialog title="Reclaim innopoints from the old website" {closeCallback}>
    <form>
      <p class="mb">
        Do you have leftover innopoints at the old website? <br />
        Fear not, you can have them here.
      </p>
      <p class="mb-2">
        Enter the e-mail or username and password of the account you used. <br />
        You can do this for all your accounts, if you have several.
      </p>

      <label for="email" class="label">
        E-mail or username
      </label>
      <TextField bind:value={email} id="email" class="mb-2" />

      <label for="password" class="label">
        Password
      </label>
      <TextField type="password" bind:value={password} id="password" class="mb-2" />

      <div class="actions">
        <Button filled disabled={!email || !password} on:click={sendRequest}>
          reclaim innopoints
        </Button>
      </div>
    </form>
  </Dialog>
</Modal>
