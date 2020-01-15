<script>
  import { stores } from '@sapper/app';
  import Button from 'ui/button.svelte';
  import NotificationCenter from '@/components/common/notification-center.svelte';
  import { login, loginCheat, logout } from '@/utils/auth.js';
  import { ENV } from '@/constants/env.js';

  const loginFunction = (ENV === 'development' ? loginCheat : login);

  const { session } = stores();
  export let isProfile = false;
</script>

<header class="top-level padded">
  <a class="logo" href="/" rel="prefetch">
    <img src="/images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if $session.user == null}
      <Button isOutline on:click={loginFunction}>sign in</Button>
    {:else}
      <NotificationCenter />
      {#if isProfile}
        <Button on:click={() => logout($session)}>sign out</Button>
      {:else}
        {#if $session.user.is_admin}
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
