<script>
  import { stores } from '@sapper/app';
  import { Button } from 'attractions';
  import { classes } from 'attractions/utils';
  import NotificationCenter from 'src/components/common/notification-center.svelte';
  import { login, logout } from 'src/utils/auth.js';

  const { session } = stores();

  export let profile = false;
  let _class = null;
  export { _class as class };
</script>

<header class={classes('padded', _class)}>
  <a class="logo" href="/" sapper:prefetch>
    <img loading="lazy" src="/images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-on-less-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if $session.account == null}
      <Button outline on:click={login}>sign in</Button>
    {:else}
      <NotificationCenter />
      {#if profile}
        <Button on:click={() => logout(session)}>sign out</Button>
      {:else}
        {#if $session.account.is_admin}
          <Button href="/dashboard" round>
            <svg src="static/images/icons/grid.svg" />
          </Button>
        {:else}
          <Button href="/profile" round>
            <svg src="static/images/icons/user.svg" />
          </Button>
        {/if}
      {/if}
    {/if}
  </div>
</header>

<style src="../../static/css/components/header.scss"></style>
