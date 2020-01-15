<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/page-components/notification-center.css" />
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Header />

<slot />

<Footer />
