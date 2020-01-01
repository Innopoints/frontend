<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
  import Button from 'ui/button.svelte';
  import {API_HOST} from '@/constants/env';
  import { isAuthed, user } from '@/store/user';

  export let classname = '';
  export let title;
  export let adminsOnly = false;

  $: condition = $isAuthed && (!adminsOnly || $user.isAdmin);
</script>

<svelte:head>
  <link rel="stylesheet" href="css/page-components/403.css" />
</svelte:head>

<style>
  :global(.layout-403) {
    flex-direction: column;
  }
</style>

<Header isProfile={title === 'Profile'} />
<div class="material {condition ? classname : 'layout-403'}">
  {#if condition}
    <slot />
  {:else}
    <h1 class="padded title-403">{title}</h1>
    <main class="padded container-403">
      <img src="images/who-are-you.svg" class="picture" alt="" />
      <div class="card">
        <div class="title">What to do?</div>
        <div class="subtitle">
          It seems like you are not authorized to access this page.
        </div>
        <div class="actions">
          <Button href="{API_HOST}login" isFilled>sign in</Button>
          <Button href="/" isOutline>run to homepage</Button>
        </div>
      </div>
    </main>
  {/if}
</div>

<Footer />
