<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['purchases', '/stock_changes/for_review'],
      ['reviews', '/projects/for_review'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Dashboard');
    }

    data.account = session.account;
    return data;
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import Reviews from '@/containers/dashboard/reviews.svelte';
  import Purchases from '@/containers/dashboard/purchases.svelte';
  import InnopointTransfer from '@/containers/dashboard/innopoint-transfer.svelte';
  export let reviews;
  export let account;
  export let purchases;
</script>

<svelte:head>
  <title>Admin Dashboard</title>

  <link rel="stylesheet" href="/css/bundles/dashboard.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/store.min.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <h1 class="padded">Dashboard</h1>
    <div class="cards padded">
      <Reviews {reviews} />
      <Purchases {purchases} />
      <InnopointTransfer />
    </div>
  </div>
</Layout>
