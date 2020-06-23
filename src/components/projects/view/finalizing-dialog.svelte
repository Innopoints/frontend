<script>
  import { getContext } from 'svelte';
  import { Button, Dialog, Modal } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import * as api from '@/utils/api.js';

  export let open = false;
  export let project;
  export let account;

  async function finalizeProject() {
    try {
      await api.json(api.patch(
        `/projects/${$project.id}/finalize`,
        { csrfToken: account.csrf_token },
      ));
      $project = await api.json(api.get(`/projects/${$project.id}`));
      open = false;
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page.' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Modal bind:open let:closeCallback>
  <Dialog title="Finalize the project?" {closeCallback}>
    <svg slot="title-icon" src="images/icons/help-circle.svg" class="icon" />
    <p>
      This is usually done when all the volunteer work is completed. <br>
      In the finalizing stage you will be able to:
    </p>
    <ul class="actual">
      <li>change actual working hours </li>
      <li>write up performance reports on volunteers</li>
      <li>send the project for the administrator's review</li>
    </ul>
    <p>
      Before you proceed, make sure to accept all volunteers who contributed. <br>
      Once the project is in the finalizing state, it may not be edited.
    </p>
    <div class="actions">
      <Button on:click={closeCallback}>
        no, wait
      </Button>
      <Button filled on:click={finalizeProject}>
        yes, finalize
      </Button>
    </div>
  </Dialog>
</Modal>
