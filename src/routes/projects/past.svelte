<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';

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
  import Layout from 'src/layouts/default.svelte';
  import Tagline from 'src/containers/projects/tagline.svelte';
  import { H1, Button } from 'attractions';
  import ProjectCard from 'src/components/projects/project-card.svelte';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import Pagination from 'src/components/common/pagination.svelte';
  import * as api from 'src/utils/api.js';

  export let projects;
  export let account;
  export let pages;
  let currentPage = 1;

  function filterProps(props) {
    let newProps = Object.assign({}, props);
    delete newProps.creation_time;
    delete newProps.moderators;
    delete newProps.review_status;
    delete newProps.tags;
    return newProps;
  }

  async function handlePageSwitch({ detail: currentPage }) {
    try {
      ({ pages, data: projects } = await api.json(api.get(`/projects/past?page=${currentPage}`)));
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>Projects – Innopoints</title>
  <meta name="og:title" content="Past Projects" />
  <meta name="og:url" content="https://ipts.innopolis.university/projects/past" />
  <meta name="og:description" content="A history of volunteering opportunities at Innopolis University" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <Tagline {account} />

    <section class="projects padded">
      <H1>
        <Button href="/projects">
          <svg src="images/icons/arrow-left.svg" class="mr" />
          to ongoing projects
        </Button>
        <span class="text">Past Projects</span>
      </H1>
      {#if !projects || projects.length === 0}
        <EmptyState>
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
        </EmptyState>
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
      <a href="/products" rel="prefetch">InnoStore</a>
      has your answers!
    </p>
  </div>
</Layout>

<style src="../../../static/css/routes/projects/index.scss"></style>
