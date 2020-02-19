<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const { account, purchases, reviews } = await getInitialData(this, session, new Map([
      ['account', '/account'],
      ['purchases', '/stock_changes/for_review'],
      ['reviews', '/projects/for_review'],
    ]));
    if (account == null || !account.is_admin) {
      this.error(403, 'Dashboard');
    }
    return { account, purchases, reviews };
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

  <link rel="stylesheet" href="/css/admin-dashboard/main.css" />
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
  <link rel="stylesheet" href="/css/page-components/empty-state.css" />
</svelte:head>

<Layout user={account}>
  <h1 class="padded">Dashboard</h1>
  <div class="cards padded material">
    <Reviews {reviews} />
    <Purchases {purchases} />
    <InnopointTransfer />
  </div>
</Layout>
