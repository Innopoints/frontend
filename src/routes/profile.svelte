<script>
  import Layout from '@/layouts/auth.svelte';
  import Info from '@/containers/profile/info.svelte';
  import Tabs from '@/containers/profile/tabs.svelte';
  import Timeline from '@/containers/profile/timeline.svelte';
  import Statistics from '@/containers/profile/stats.svelte';
  import Notifications from '@/containers/profile/notifications.svelte';

  let activeTab = 'T';
  function changeTab(target) {
    activeTab = target.detail;
  }
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
    <Tabs on:change={changeTab} />
    {#if activeTab === 'T'}
      <Timeline />
    {:else if activeTab === 'S'}
      <Statistics />
    {:else if activeTab === 'N'}
      <Notifications />
    {/if}
  </section>
</Layout>
