<script context="module">
  import * as api from '@/utils/api.js';

  export async function preload() {
    const [projects, competences] = await Promise.all([
      api.get('/projects'),
      api.get('/competences'),
    ]);
    return { projects, competences };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/projects/tagline.svelte';
  import Button from 'ui/button.svelte';
  import ProjectCard from '@/components/projects/card.svelte';
  import Filters from '@/containers/projects/filters.svelte';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { orderLabels, orderOptions } from '@/constants/projects/order.js';

  const { session } = stores();

  export let projects;
  export let competences;

  let order = orderOptions[0];
  let orderLabel = orderLabels[0];

  function updateProjects(filtering) {
    let queryArgs = new Map();

    if (filtering.searchQuery) {
      queryArgs.set('q', filtering.searchQuery);
    }

    if (filtering.vacantSpots != null) {
      queryArgs.set('spots', filtering.vacantSpots.toString());
    }

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
    api.get('/projects' + (queryString ? '?' + queryString : ''))
      .then(newProjects => { projects = newProjects; });
  }
</script>

<svelte:head>
  <title>Projects – Innopoints</title>

  <!-- Styles for Projects page -->
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/page-components/tagline.css" />
  <link rel="stylesheet" href="css/page-components/empty-state.css" />
  <link rel="stylesheet" href="css/page-components/filters.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/projects/filters-spec.css" />
  <link rel="stylesheet" href="css/projects/main.css" />
</svelte:head>

<Layout>
  <div class="material">
    <Tagline />

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
              {#if session.user}
                But you can
                <a href="/project/new" rel="prefetch">create a project</a>
                right now!
              {/if}
            </figcaption>
          </figure>
        </div>
      {:else}
        <div class="cards">
          {#each projects as project (project.id)}
            <ProjectCard {...project} />
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
