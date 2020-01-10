<script>
  import Layout from '@/layouts/default.svelte';
  import Button from 'ui/button.svelte';

  export let error;
	export let status;
	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  {#if status == 404}
    <title>Page not found – Innopoints</title>
  {:else}
    <title>Something went wrong...</title>
  {/if}
  <link rel="stylesheet" href="/css/page-components/header.css">
  <link rel="stylesheet" href="/css/page-components/404.css">
  <link rel="stylesheet" href="/css/page-components/footer.css">
</svelte:head>

<Layout>
  {#if status == 404}
    <div class="material container-404 padded">
      <div class="text">
        <h1>Nothing here</h1>
        <p class="subtitle">That rabbit must have given you the wrong lead.</p>
        <Button href="/" isFilled>
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
      <a href="/store" class="destination">
        <img src="images/404/browser.svg" width="212" height="137" class="repr" alt="Go to a product page">
      </a>
      <a href="/" class="destination">
        <img src="images/404/random.svg" width="212" height="137" class="repr" alt="Go somewhere random">
      </a>
    </div>
  {:else}
    <div class="material">
      <h1>Alright, so here's what happened</h1>
      {#if dev && error.stack}
        <pre>{error.stack}</pre>
      {/if}
    </div>
  {/if}
</Layout>
