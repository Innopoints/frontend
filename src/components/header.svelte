<script>
  import { Button } from 'attractions';
  import NotificationCenter from '@/components/common/notification-center.svelte';
  import { login, logout } from '@/utils/auth.js';

  export let profile = false;
  export let user = null;
</script>

<header class="padded">
  <a class="logo" href="/" rel="prefetch">
    <img src="images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-on-less-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if user == null}
      <Button outline on:click={login}>sign in</Button>
    {:else}
      <NotificationCenter />
      {#if profile}
        <Button on:click={logout}>sign out</Button>
      {:else}
        {#if user.is_admin}
          <Button href="/dashboard" round>
            <svg src="images/icons/grid.svg" />
          </Button>
        {:else}
          <Button href="/profile" round>
            <svg src="images/icons/user.svg" />
          </Button>
        {/if}
      {/if}
    {/if}
  </div>
</header>

<style src="../../static/css/components/header.scss"></style>
