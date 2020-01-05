<script>
  import Button from 'ui/button.svelte';
  // import NotificationCenter from '@/components/profile/notification-center.svelte';
  import { isAuthed, login, user } from '@/store/user';
</script>

<header class="container">
  <img
    src="/images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo" />
  {#if !$isAuthed}
    <Button isOutline on:click={login}>sign in</Button>
  {:else}
    <div class="actions">
      <!-- TODO: decomment after markup changes -->
      <!--<NotificationCenter />-->
      {#if $user.is_admin}
        <Button href="/dashboard" isRound>
          <svg src="images/icons/grid.svg" />
        </Button>
      {:else}
        <Button href="/profile" isRound>
          <svg src="images/icons/user.svg" />
        </Button>
      {/if}
    </div>
  {/if}
</header>
