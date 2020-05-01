<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    let { projects } = await getInitialData(this, session, new Map([
      ['projects', `/projects/past`],
    ]));
    if (projects == null) {
      projects = { data: [], pages: 0 };
    }
    return {
      projects: projects.data,
      pages: projects.pages,
      account: session.account,
    };
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/projects/tagline.svelte';
  import Button from 'ui/button.svelte';
  import ProjectCard from '@/components/projects/project-card.svelte';
  import Pagination from '@/components/common/pagination.svelte';
  import * as api from '@/utils/api.js';

  export let projects;
  export let account;
  export let pages;
  let currentPage = 1;

  function filterProps(props) {
    let newProps = Object.assign({}, props);
    delete newProps.creation_time;
    delete newProps.moderators;
    delete newProps.review_status;
    return newProps;
  }

  function handlePageSwitch(evt) {
    currentPage = evt.detail;
    api.get('/projects/past?page={currentPage}')
      .then(resp => resp.json())
      .then((newProjects) => projects = newProjects.data);
  }
</script>

<svelte:head>
  <title>Projects – Innopoints</title>
  <meta name="og:title" content="Past Projects" />
  <meta name="og:url" content="https://ipts.innopolis.university/projects/past" />
  <meta name="og:description" content="A history of volunteering opportunities at Innopolis University" />

  <!-- Styles for Projects page -->
  <link rel="stylesheet" href="/css/bundles/projects.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects-id.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/projects-new.min.css" />
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
    <Tagline {account} />

    <section class="projects padded">
      <h1>
        <Button href="/projects">
          <svg src="images/icons/arrow-left.svg" class="icon mr" />
          to ongoing projects
        </Button>
        <span class="text">Past Projects</span>
      </h1>
      {#if !projects || projects.length === 0}
        <div class="empty">
          <figure>
            <img class="picture" src="images/projects/no-projects.svg" alt="" />
            <figcaption>
              <div class="title">No past projects yet...</div>
              {#if account}
                But you can
                <a href="/projects/new" rel="prefetch">create a project</a>
                right now!
              {/if}
            </figcaption>
          </figure>
        </div>
      {:else}
        <div class="cards">
          {#each projects as project (project.id)}
            <ProjectCard
              moderated={account && project.moderators.some(
                x => x.email === account.email,
              )}
              {...filterProps(project)}
            />
          {/each}
        </div>
        <Pagination {pages} {currentPage} on:page-switch={handlePageSwitch} />
      {/if}
    </section>

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The
      <a href="/store" rel="prefetch">InnoStore</a>
      has your answers!
    </p>
  </div>
</Layout>
