<script>
  import Button from 'ui/button.svelte';
  import NotificationCenter from '@/components/profile/notification-center.svelte';
  import {API_HOST} from '@/constants/env';
  import {isAuthed, signOut} from '@/store/user';
  export let isProfile = false;
</script>

<header class="top-level padded">
  <a class="logo" href="/">
    <img src="/images/innou-icon.svg" alt="Go to the home page" />
    <span class="hide-tb">Innopoints</span>
  </a>
  <div class="actions">
    {#if !$isAuthed}
      <Button isOutline href="{API_HOST}login">sign in</Button>
    {:else}
      {#if isProfile}
        <NotificationCenter />
        <Button on:click={signOut}>sign out</Button>
      {:else}
        <Button href="/profile" isRound>
          <svg src="images/icons/user.svg" />
        </Button>
      {/if}
    {/if}
  </div>
</header>
