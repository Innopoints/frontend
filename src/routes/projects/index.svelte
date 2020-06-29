<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['projects', `/projects`],
    ]));
    data.account = session.account;
    return data;
  }
</script>

<script>
  import Layout from 'src/layouts/default.svelte';
  import Tagline from 'src/containers/projects/tagline.svelte';
  import { H1, Button } from 'attractions';
  import ProjectCard from 'src/components/projects/project-card.svelte';
  import Filters from 'src/containers/projects/filters.svelte';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import generateQueryString from 'src/utils/generate-query-string.js';
  import orderOptions from 'src/constants/projects/order.js';
  import * as api from 'src/utils/api.js';

  export let projects;
  export let account;

  let selectedOrder = orderOptions[0];

  async function updateProjects(filtering) {
    const queryArgs = new Map();

    if (filtering.searchQuery) {
      queryArgs.set('q', filtering.searchQuery);
    }

    queryArgs.set('order_by', filtering.order.value.orderBy);
    queryArgs.set('order', filtering.order.value.order);
    const queryString = generateQueryString(queryArgs);
    try {
      projects = await api.json(api.get('/projects?' + queryString));
    } catch (e) {
      console.error(e);
    }
  }

  function filterProps(props) {
    let newProps = Object.assign({}, props);
    delete newProps.creation_time;
    delete newProps.moderators;
    delete newProps.review_status;
    delete newProps.tags;
    return newProps;
  }
</script>

<svelte:head>
  <title>Projects – Innopoints</title>
  <meta name="og:title" content="Projects" />
  <meta name="og:url" content="https://ipts.innopolis.university/projects" />
  <meta name="og:description" content="If you’re seeking an opportunity to contribute to the wonderful world of Innopolis projects, you’re in the right place." />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <Tagline {account} />

    <section class="projects padded">
      <H1><span class="text">Ongoing Projects</span></H1>
      <Filters
        {selectedOrder} {orderOptions}
        on:change-filters={({ detail: filtering }) => updateProjects(filtering)}
      />
      {#if !projects || projects.length === 0}
        <EmptyState>
          <figure>
            <img class="picture" src="/images/projects/no-projects.svg" alt="" />
            <figcaption>
              <div class="title">No projects found...</div>
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
      {/if}
    </section>

    <div class="justify-center">
      <Button href="/projects/past">
        <svg src="static/images/icons/book-open.svg" class="icon mr" />
        see past projects
      </Button>
    </div>

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The
      <a href="/products" rel="prefetch">InnoStore</a>
      has your answers!
    </p>
  </div>
</Layout>

<style src="../../../static/css/routes/projects/index.scss"></style>
