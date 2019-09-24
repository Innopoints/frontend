<script>
  import Layout from '../layouts/home.svelte';
  import Tagline from '../containers/home/tagline.svelte';
</script>

<svelte:head>
  <title>Home – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/home/header.css" />
  <link rel="stylesheet" href="css/home/tagline.css" />
</svelte:head>

<Layout>
  <Tagline />
</Layout>
