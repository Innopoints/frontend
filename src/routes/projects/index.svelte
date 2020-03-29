<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    let { account, projects, competences } = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['projects', `/projects`],
      ['competences', `/competences`],
    ]));
    return { projects, competences, account };
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/projects/tagline.svelte';
  import Button from 'ui/button.svelte';
  import ProjectCard from '@/components/projects/project-card.svelte';
  import Filters from '@/containers/projects/filters.svelte';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { orderLabels, orderOptions } from '@/constants/projects/order.js';
  import * as api from '@/utils/api.js';

  export let projects;
  export let competences;
  export let account;

  let order = orderOptions[0];
  let orderLabel = orderLabels[0];

  async function updateProjects(filtering) {
    let queryArgs = new Map();

    if (filtering.searchQuery) {
      queryArgs.set('q', filtering.searchQuery);
    }

    if (filtering.vacantSpots != null) {
      queryArgs.set('spots', filtering.vacantSpots.toString());
    }

    // TODO: implement
    // if (filtering.minDate != null) {
    //   queryArgs.set('min', filtering.minPrice);
    // }
    // if (filtering.maxDate != null) {
    //   queryArgs.set('max', filtering.maxPrice);
    // }

    if (filtering.excludedCompetences.length !== 0) {
      queryArgs.set('excluded_competences', JSON.stringify(filtering.excludedCompetences));
    }

    queryArgs.set('order_by', filtering.order.orderBy);
    queryArgs.set('order', filtering.order.order);
    const queryString = generateQueryString(queryArgs);
    const response = await api.get('/projects?' + queryString);
    if (!response.ok) return;
    projects = await response.json();
  }

  function filterProps(props) {
    let newProps = Object.assign({}, props);
    delete newProps.creation_time;
    delete newProps.moderators;
    delete newProps.creator;
    delete newProps.review_status;
    return newProps;
  }
</script>

<svelte:head>
  <title>Projects – Innopoints</title>

  <!-- Styles for Projects page -->
  <link rel="stylesheet" href="/css/bundles/projects.min.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <Tagline {account} />

    <section class="projects padded">
      <h1><span class="text">Ongoing Projects</span></h1>
      <Filters
        {order} {orderLabel} {competences} {orderOptions} {orderLabels}
        on:change-filters={(event) => updateProjects(event.detail)}
      />
      {#if !projects || projects.length === 0}
        <div class="empty">
          <figure>
            <img class="picture" src="images/projects/no-projects.svg" alt="" />
            <figcaption>
              <div class="title">No projects found...</div>
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
      {/if}
    </section>

    <div class="justify-center">
      <Button href="/projects/past">
        <svg src="images/icons/book-open.svg" class="icon mr" />
        see past projects
      </Button>
    </div>

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The
      <a href="/store" rel="prefetch">InnoStore</a>
      has your answers!
    </p>
  </div>
</Layout>
