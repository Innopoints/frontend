<script>
  import Header from '@/components/home/header.svelte';
  import Footer from '@/components/footer.svelte';

  export let user = null;
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/page-components/notification-center.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<div class="material">
  <Header {user} />
  <slot />
</div>

<Footer />
