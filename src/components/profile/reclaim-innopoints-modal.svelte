<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';
  import TextField from 'ui/text-field.svelte';

  export let isOpen = false;
  export let error = null;
  let email;
  let password;

  function sendRequest() {
    dispatch('submit', { email, password });
    email = null;
    password = null;
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  <Dialog
    title="Reclaim innopoints from the old website"
    closeCallback={() => isOpen = false}
    classname="reclaim-innopoints-modal"
  >
    <form slot="content">
      <p class="mb">
        Do you have leftover innopoints at the old website? <br />
        Fear not, you can have them here.
      </p>
      <p class="mb-2">
        Enter the e-mail and password of the account you used. <br />
        You can do this for all your accounts, if you have several.
      </p>

      <label for="email" class="label">
        E-mail
      </label>
      <TextField bind:value={email} id="email" classname="mb-2" />

      <label for="password" class="label">
        Password
      </label>
      <TextField type="password" bind:value={password} id="password" classname="mb-2" />

      {#if error != null}
        <p class="error">{error}</p>
      {/if}

      <div class="actions">
        <Button isFilled disabled={!email || !password} on:click={sendRequest}>
          reclaim innopoints
        </Button>
      </div>
    </form>
  </Dialog>
</Modal>
