<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
  import Button from 'ui/button.svelte';
  import { isAuthed, logIn, user } from '@/store/user';

  export let classname = '';
  export let title;
  export let adminsOnly = false;
</script>

<svelte:head>
  <link rel="stylesheet" href="css/page-components/403.css" />
</svelte:head>

<Header />
<div class="material {classname}">
  {#if $isAuthed && (!adminsOnly || (adminsOnly && $user.isAdmin))}
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
          <Button on:click={logIn} isFilled>sign in</Button>
          <Button href="/" isOutline>run to homepage</Button>
        </div>
      </div>
    </main>
  {/if}
</div>

<Footer />
