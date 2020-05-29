<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  const productLimit = 3;

  export async function preload(page, session) {
    const data =  await getInitialData(this, session, new Map([
      ['products', {
        url: `/products?limit=${productLimit}`,
        transform: (resp) => resp.data,
      }],
    ]));

    data.account = session.account;
    return data;
  }
</script>

<script>
  import Header from '@/components/home/header.svelte';
  import Footer from '@/components/footer.svelte';
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
</svelte:head>

<!-- TODO: add transitions (animation) -->
<div class="material">
  <Header user={account} />
  <Tagline />
  <HowTo />
  <Options />
  <Store {products} />
  <Contacts />
</div>

<Footer />

<style global src="../../static/css/routes/index.scss"></style>
