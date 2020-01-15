<script>
  import { stores } from '@sapper/app';
  import Button from 'ui/button.svelte';
  import NotificationCenter from '@/components/common/notification-center.svelte';
  import { login, loginCheat } from '@/utils/auth.js';
  import { ENV } from '@/constants/env.js';

  const loginFunction = (ENV === 'development' ? loginCheat : login);

  const { session } = stores();
</script>

<header class="container">
  <img
    src="/images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo" />
  {#if $session.user == null}
    <Button isOutline on:click={loginFunction}>sign in</Button>
  {:else}
    <div class="actions">
      <NotificationCenter />
      {#if $session.user.is_admin}
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
