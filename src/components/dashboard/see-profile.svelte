<script>
  import Button from 'ui/button.svelte';

  export let users = [];
  const open = () => {
    for (let user of users) {
      window.open('/profile?user=' + user.email);
    }
  };
</script>

<div class="see-profile">
  <header>
    <svg src="/images/icons/user.svg" class="icon mr-2" />
    See their profiles
  </header>
  <div class="subtitle">This will open new tabs.</div>
  <Button on:click={open} disabled={!users.length}>
    open profile
  </Button>
</div>
