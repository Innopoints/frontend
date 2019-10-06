<script>
  import Button from 'ui/button.svelte';
  import user, { logIn } from '@/store/user';
  let isAuthed;

  user.subscribe(val => {
    isAuthed = val.isAuthed;
  });
</script>

<header class="container">
  <img
    src="images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo" />
  {#if !isAuthed}
    <Button outline on:click={logIn}>sign in</Button>
  {:else}
    <Button href="/profile" round>
      <svg src="images/icons/user.svg" />
    </Button>
  {/if}
</header>
