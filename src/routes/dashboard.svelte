<script>
  import Layout from '@/layouts/auth.svelte';
  import Reviews from '@/containers/dashboard/reviews.svelte';
  import Purchases from '@/containers/dashboard/purchases.svelte';
  import InnopointTransfer from '@/containers/dashboard/innopoint-transfer.svelte';
  import reviews from '@/constants/dashboard/review';
  import purchases from '@/constants/dashboard/purchases';
</script>

<svelte:head>
  <title>Admin Dashboard</title>

  <link rel="stylesheet" href="/css/admin-dashboard/main.css" />
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Layout title="Dashboard" adminsOnly>
  <h1 class="padded">Dashboard</h1>
  <div class="cards padded">
    <Reviews {reviews} />
    <Purchases {purchases} />
    <InnopointTransfer />
  </div>
</Layout>
