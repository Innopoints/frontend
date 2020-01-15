<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  const productLimit = 3;

  export async function preload(page, session) {
    return await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['products', {
        url: `/products?limit=${productLimit}`,
        transform: (resp) => resp.data,
      }],
    ]));
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/home.svelte';
  import Tagline from '@/containers/home/tagline.svelte';
  import HowTo from '@/containers/home/how-to.svelte';
  import Options from '@/containers/home/options.svelte';
  import Store from '@/containers/home/store.svelte';
  import Contacts from '../containers/home/contacts.svelte';

  const { session } = stores();

  export let products;
  export let account;
  $session.user = account;
</script>

<svelte:head>
  <title>Home – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/home/header.css" />
  <link rel="stylesheet" href="css/home/main.css" />
  <link rel="stylesheet" href="css/home/tagline.css" />
  <link rel="stylesheet" href="css/home/how-to.css" />
  <link rel="stylesheet" href="css/home/contacts.css" />
  <link rel="stylesheet" href="css/home/options.css" />
  <link rel="stylesheet" href="css/home/store.css" />
  <link rel="stylesheet" href="css/page-components/empty-state.css" />
</svelte:head>

<!--todo: add transitions (animation)-->
<Layout>
  <Tagline />
  <HowTo />
  <Options />
  <Store {products} />
  <Contacts />
</Layout>
