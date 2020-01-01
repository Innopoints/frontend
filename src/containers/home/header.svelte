<script>
  import Button from 'ui/button.svelte';
  import {API_HOST} from '@/constants/env';
  import { isAuthed } from '@/store/user';
</script>

<header class="container">
  <img
    src="images/innou-logo.svg"
    class="logo"
    alt="Innopolis University logo" />
  {#if !$isAuthed}
    <Button isOutline href="{API_HOST}login">sign in</Button>
  {:else}
    <Button href="/profile" isRound>
      <svg src="images/icons/user.svg" />
    </Button>
  {/if}
</header>
