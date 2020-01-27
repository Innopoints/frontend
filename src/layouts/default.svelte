<script>
  import { stores } from '@sapper/app';
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';

  const { page } = stores();
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/page-components/notification-center.css" />
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Header isProfile={(/^\/(?:profile|dashboard)/).test($page.path)} />

<slot />

<Footer />
