<script>
  import { Button } from 'attractions';
  import NotificationCenter from '@/components/common/notification-center.svelte';
  import { login } from '@/utils/auth.js';

  export let user = null;
</script>

<header class="container">
  <img
    src="images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo"
  />
  {#if user == null}
    <Button outline on:click={login}>sign in</Button>
  {:else}
    <div class="actions">
      <NotificationCenter />
      {#if user.is_admin}
        <Button href="/dashboard" round>
          <svg src="images/icons/grid.svg" />
        </Button>
      {:else}
        <Button href="/profile" round>
          <svg src="images/icons/user.svg" />
        </Button>
      {/if}
    </div>
  {/if}
</header>

<style src="../../../static/css/components/home/header.scss"></style>
