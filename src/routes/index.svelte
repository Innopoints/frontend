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
  import Layout from '@/layouts/home.svelte';
  import Tagline from '@/containers/home/tagline.svelte';
  import HowTo from '@/containers/home/how-to.svelte';
  import Options from '@/containers/home/options.svelte';
  import Store from '@/containers/home/store.svelte';
  import Contacts from '../containers/home/contacts.svelte';

  export let products;
  export let account;
</script>

<svelte:head>
  <title>Home – Innopoints</title>
  <meta name="og:title" content="Home" />
  <meta name="og:url" content="https://ipts.innopolis.university" />
  <meta name="og:description" content="Innopoints is a system that encourages extracurricular participation. It helps to manage volunteers, track soft skills, obtain feedback and get branded Innopolis University merchandise as a reward!" />

  <link rel="stylesheet" href="/css/bundles/home.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/store.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects.min.css" />
  {#if account}
    {#if account.is_admin}
      <link rel="prefetch" as="style" href="/css/bundles/dashboard.min.css" />
    {:else}
      <link rel="prefetch" as="style" href="/css/bundles/profile.min.css" />
    {/if}
  {/if}
</svelte:head>

<!--todo: add transitions (animation)-->
<Layout user={account}>
  <Tagline />
  <HowTo />
  <Options />
  <Store {products} />
  <Contacts />
</Layout>
