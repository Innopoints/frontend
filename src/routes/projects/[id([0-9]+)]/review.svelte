<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['project', `/projects/${page.params.id}`],
      ['competences', '/competences'],
    ]));
    if (data.account == null || !data.account.is_admin) {
      this.error(403, 'Dashboard');
    }
    return data;
  }
</script>

<script>
  import { writable } from 'svelte/store';
  import { goto, prefetch } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import ProjectHeader from '@/containers/projects/view/project-header.svelte';
  import ModeratorView from '@/containers/projects/view/moderator-view.svelte';
  import ModeratorHourPanel from '@/containers/projects/view/moderator-hour-panel.svelte';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';
  import * as api from '@/utils/api.js';

  export let project;
  export let account;
  export let competences;

  const projectStore = writable(project);

  async function submitReview({ detail }) {
    try {
      prefetch(`/projects/${project.id}`);
      await api.json(api.patch(`/projects/${project.id}/review_status`, {
        data: {
          admin_feedback: detail.comment,
          review_status: detail.accept ? ReviewStatuses.APPROVED : ReviewStatuses.REJECTED,
        },
      }));
      goto(`/projects/${project.id}`);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Review {project.name} – Innopoints</title>

  <!-- Styles for Review Project page -->
  <link rel="stylesheet" href="/css/bundles/projects-id-review.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects-id.min.css" />
  {#if account}
    {#if account.is_admin}
      <link rel="prefetch" as="style" href="/css/bundles/dashboard.min.css" />
    {:else}
      <link rel="prefetch" as="style" href="/css/bundles/profile.min.css" />
    {/if}
  {/if}
</svelte:head>

<Layout user={account}>
  <div class="material">
    <ProjectHeader review {project} {account} on:submit-review={submitReview} />

    <h2 class="padded">Project Staff</h2>
    <ModeratorHourPanel review {project} {account} />

    <h2 class="padded">Activities</h2>
    <ModeratorView
      review
      {account}
      {competences}
      activities={project.activities}
      project={projectStore}
    />
  </div>
</Layout>
