<script>
  import Layout from '@/layouts/default.svelte';
  import Button from 'ui/button.svelte';
</script>

<svelte:head>
  <title>Page not found – Innopoints</title>

  <link rel="stylesheet" href="/css/page-components/header.css">
  <link rel="stylesheet" href="/css/page-components/404.css">
  <link rel="stylesheet" href="/css/page-components/footer.css">

  <!-- Home styles -->
  <link rel="preload" href="/css/home/main.css" as="style" />
  <link rel="preload" href="/css/home/header.css" as="style" />
  <link rel="preload" href="/css/home/tagline.css" as="style" />
  <link rel="preload" href="/css/home/how-to.css" as="style" />
  <link rel="preload" href="/css/home/options.css" as="style" />
  <link rel="preload" href="/css/home/store.css" as="style" />
  <link rel="preload" href="/css/home/contacts.css" as="style" />
</svelte:head>

<Layout>
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
</Layout>
