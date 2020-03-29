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
</svelte:head>

<!--todo: add transitions (animation)-->
<Layout user={account}>
  <Tagline />
  <HowTo />
  <Options />
  <Store {products} />
  <Contacts />
</Layout>
