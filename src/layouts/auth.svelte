<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
  import Button from 'ui/button.svelte';
  import { isAuthed, logIn } from '@/store/user';

  export let title;
</script>

<svelte:head>
  <link rel="stylesheet" href="css/page-components/403.css" />
</svelte:head>

<div class="material">
  <Header />
  {#if $isAuthed}
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
          <Button on:click={logIn} filled>sign in</Button>
          <Button outline href="/">run to homepage</Button>
        </div>
      </div>
    </main>
  {/if}
</div>

<Footer />
