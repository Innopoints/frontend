<script>
  import Layout from '@/layouts/default.svelte';
  import { Button, Card, H1 } from 'attractions';
  import { login } from '@/utils/auth.js';

  export let error;
  export let status;
  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  {#if status === 404}
    <title>Page not found – Innopoints</title>
  {:else if status === 403}
    <title>{error.message} – Innopoints</title>
  {:else}
    <title>Something went wrong...</title>
  {/if}
</svelte:head>

<Layout>
  {#if status == 404}
    <div class="material container-404 padded">
      <div class="text">
        <H1>Nothing here</H1>
        <p class="subtitle">That rabbit must have given you the wrong lead.</p>
        <Button href="/" filled>
          <svg src="/images/icons/home.svg" class="icon mr" />
          take me home
        </Button>
      </div>
      <img src="/images/404/web-traveller.svg" width="240" height="387" class="picture" alt="">
      <h2>Feeling lucky?</h2>
      <a href="/profile" class="destination">
        <img src="images/404/profile.svg" width="212" height="137" class="repr" alt="Go to the profile">
      </a>
      <a href="/projects" class="destination">
        <img src="images/404/browser.svg" width="212" height="137" class="repr" alt="Go to the projects">
      </a>
      <a href="/products" class="destination">
        <img src="images/404/browser.svg" width="212" height="137" class="repr" alt="Go to a product page">
      </a>
      <a href="/" class="destination">
        <img src="images/404/random.svg" width="212" height="137" class="repr" alt="Go somewhere random">
      </a>
    </div>
  {:else if status == 403}
    <div class="material">
      <H1 class="padded header-403">{error.message}</H1>
      <main class="padded container-403">
        <img src="/images/who-are-you.svg" class="picture" alt="" />
        <Card>
          <div class="title">What to do?</div>
          <div class="subtitle">It seems like you are not authorized to access this page.</div>
          <div class="actions">
            <Button isFilled on:click={login}>sign in</Button>
            <Button isOutline href="/">run to homepage</Button>
          </div>
        </Card>
      </main>
    </div>
  {:else}
    <div class="material padded">
      <H1>Alright, so here's what happened</H1>
      {#if dev && error.stack}
        <pre>{error.stack}</pre>
      {/if}
    </div>
  {/if}
</Layout>
