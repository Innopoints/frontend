<script>
  import Button from 'ui/button.svelte';
  import { isAuthed, logIn } from '@/store/user';
</script>

<header class="container">
  <img
    src="images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo" />
  {#if !$isAuthed}
    <Button isOutline on:click={logIn}>sign in</Button>
  {:else}
    <Button href="/profile" isRound>
      <svg src="images/icons/user.svg" />
    </Button>
  {/if}
</header>
