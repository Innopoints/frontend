<script>
  import Layout from '@/layouts/auth.svelte';
  import Reviews from '@/containers/dashboard/reviews.svelte';
  import Purchases from '@/containers/dashboard/purchases.svelte';
  import InnopointTransfer from '@/containers/dashboard/innopoint-transfer.svelte';
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
    <Reviews />
    <Purchases />
    <InnopointTransfer />
  </div>
</Layout>
