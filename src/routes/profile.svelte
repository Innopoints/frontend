<script>
  import Layout from '@/layouts/auth.svelte';
  import Info from '@/containers/profile/info.svelte';
</script>

<svelte:head>
  <title>Profile – Innopoints</title>

  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/profile/quick-info.css" />
  <link rel="stylesheet" href="css/profile/main-card.css" />
  <link rel="stylesheet" href="css/profile/timeline.css" />
  <link rel="stylesheet" href="css/profile/statistics.css" />
  <link rel="stylesheet" href="css/profile/bar-colors.css" />
  <link rel="stylesheet" href="css/profile/notifications.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
</svelte:head>

<Layout title="Profile">
  <Info />
  <section class="card">
    <!--<ProfileTabs @change="changeTabs" />
    <ProfileTimeline v-if="activeTab === 'T'" />
    <ProfileStatistics v-else-if="activeTab === 'S'" />
    <ProfileNotifications v-else-if="activeTab === 'N'" />-->
  </section>
</Layout>
