<script>
  import Layout from '@/layouts/home.svelte';
  import Tagline from '@/containers/home/tagline.svelte';
  import HowTo from '@/containers/home/how-to.svelte';
  import Options from '@/containers/home/options.svelte';
  import Store from '@/containers/home/store.svelte';
  import Contacts from '../containers/home/contacts.svelte';
</script>

<svelte:head>
  <title>Home – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/home/header.css" />
  <link rel="stylesheet" href="css/home/main.css" />
  <link rel="stylesheet" href="css/home/tagline.css" />
  <link rel="stylesheet" href="css/home/how-to.css" />
  <link rel="stylesheet" href="css/home/contacts.css" />
  <link rel="stylesheet" href="css/home/options.css" />
  <link rel="stylesheet" href="css/home/store.css" />
</svelte:head>

<!--todo: add transitions (animation)-->
<Layout>
  <Tagline />
  <HowTo />
  <Options />
  <Store />
  <Contacts />
</Layout>
