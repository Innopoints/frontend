<script>
  import Button from 'ui/button.svelte';
  import user, { logIn } from '@/store/user';
  let isAuthed;

  user.subscribe(val => {
    isAuthed = val.isAuthed;
  });
</script>

<header class="top-level padded">
  <a class="logo" href="/">
    <img src="images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if !isAuthed}
      <Button outline on:click={logIn}>sign in</Button>
    {:else}
      <Button href="/profile" round>
        <svg src="images/icons/user.svg" />
      </Button>
    {/if}
  </div>
</header>
