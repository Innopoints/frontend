<script>
  import Button from 'ui/button.svelte';
  import { isAuthed, logIn, user } from '@/store/user';
</script>

<header class="top-level padded">
  <a class="logo" href="/">
    <img src="images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if !$isAuthed}
      <Button isOutline on:click={logIn}>sign in</Button>
    {:else}
      <Button href={$user.isAdmin ? '/dashboard' : '/profile'} isRound>
        <svg src="images/icons/user.svg" />
      </Button>
    {/if}
  </div>
</header>
