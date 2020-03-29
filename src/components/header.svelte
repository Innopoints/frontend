<script>
  import Button from 'ui/button.svelte';
  import NotificationCenter from '@/components/common/notification-center.svelte';
  import { login, logout } from '@/utils/auth.js';

  export let isProfile = false;
  export let user = null;
</script>

<header class="top-level padded">
  <a class="logo" href="/" rel="prefetch">
    <img src="/images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if user == null}
      <Button isOutline on:click={login}>sign in</Button>
    {:else}
      <NotificationCenter />
      {#if isProfile}
        <Button on:click={() => logout()}>sign out</Button>
      {:else}
        {#if user.is_admin}
          <Button href="/dashboard" isRound>
            <svg src="images/icons/grid.svg" />
          </Button>
        {:else}
          <Button href="/profile" isRound>
            <svg src="images/icons/user.svg" />
          </Button>
        {/if}
      {/if}
    {/if}
  </div>
</header>
