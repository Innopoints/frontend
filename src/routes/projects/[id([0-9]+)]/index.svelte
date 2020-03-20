<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    return await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['project', `/projects/${page.params.id}`],
      ['competences', '/competences'],
    ]));
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import ProjectHeader from '@/containers/projects/view/project-header.svelte';
  import UserActivityCard from '@/components/projects/view/user-activity-card.svelte';

  export let project;
  export let account;
  export let competences;

  const activityCards = (
    project.activities
      .filter(x => !x.internal)
      .map(act => ({...act, expanded: false}))
  );
</script>

<svelte:head>
  <title>{project.name} – Innopoints</title>

  <!-- Styles for View Project page -->
  <link rel="stylesheet" href="css/view-project/main.css" />
  <link rel="stylesheet" href="css/view-project/activity.css" />
  <link rel="stylesheet" href="css/view-project/activity-user.css" />
  <link rel="stylesheet" href="css/view-project/activity-moderated.css" />
  <link rel="stylesheet" href="css/view-project/activity-finalizing.css" />
  <link rel="stylesheet" href="css/page-components/create-activity.css" />
  <link rel="stylesheet" href="css/view-project/moderators.css" />
  <link rel="stylesheet" href="css/view-project/proper-grid.css" />
  <link rel="stylesheet" href="css/view-project/report-performance-modal.css" />
  <link rel="stylesheet" href="css/view-project/apply-modal.css" />
  <link rel="stylesheet" href="css/page-components/empty-state.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <ProjectHeader {project} />

    <h2 class="padded">Activities</h2>
    <div class="activities user padded">
      {#each activityCards as activity (activity.id)}
        <UserActivityCard {activity} {competences} {account} />
      {/each}
    </div>
  </div>
</Layout>
