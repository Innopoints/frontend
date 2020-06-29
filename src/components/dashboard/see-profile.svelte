<script>
  import { getContext } from 'svelte';
  import { Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';

  export let users = [];

  function open() {
    for (const user of users) {
      const otherWindow = window.open('/profile?user=' + user.email, '_blank');
      if (otherWindow == null) {
        console.warn('New tab blocked by pop-up blocker');
        showSnackbar({
          props: { text: 'Could not open a new tab. Is your browser blocking pop-ups?' },
        });
      }
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="see-profile">
  <header>
    <svg src="static/images/icons/user.svg" class="icon mr-2" />
    See their profiles
  </header>
  <div class="subtitle">This will open new tabs.</div>
  <Button on:click={open} disabled={!users.length} class="mt">
    open profiles
  </Button>
</div>

<style src="../../../static/css/components/dashboard/see-profile.scss"></style>
