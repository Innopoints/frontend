<script>
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/projects/tagline.svelte';
  import Button from 'ui/button.svelte';
  import projectsList from '@/constants/projects/projects';
  import Project from '@/components/projects/card.svelte';
  import Filters from '@/containers/projects/filters.svelte';
  import Ordering from '@/containers/projects/ordering.svelte';

  // const projectsPerPage = 8;
  // const currentPage = 1;
  // const projects = () => {
  //   const page = currentPage - 1;
  //   const start = projectsPerPage * page;
  //   const end = start + projectsPerPage;
  //   return projectsList.slice(start, end);
  // };
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

  <!-- Styles for the landing -->
  <link rel="preload" href="css/home/main.css" as="style" />
  <link rel="preload" href="css/home/header.css" as="style" />
  <link rel="preload" href="css/home/tagline.css" as="style" />
  <link rel="preload" href="css/home/how-to.css" as="style" />
  <link rel="preload" href="css/home/options.css" as="style" />
  <link rel="preload" href="css/home/store.css" as="style" />
  <link rel="preload" href="css/home/contacts.css" as="style" />

  <!-- Store styles -->
  <link rel="preload" href="css/store/filters-spec.css" as="style" />
  <link rel="preload" href="css/store/main.css" as="style" />
  <link rel="preload" href="css/view-product/main.css" as="style" />
  <link rel="preload" href="css/page-components/pagination.css" as="style" />
  <link rel="preload" href="css/page-components/modal-dialog.css" as="style" />
</svelte:head>

<Layout>
  <Tagline />

  <section class="projects padded">
    <h1>Ongoing projects</h1>

    <Filters />
    <Ordering />

    {#if projectsList.length === 0}
      <div class="empty">
        <figure>
          <img
            class="picture"
            src="images/projects/no-projects.svg"
            alt="no projects found" />
          <figcaption>
            <div class="title">No projects found...</div>
            But you can
            <a href="/project/new">create a project</a>
            right now!
          </figcaption>
        </figure>
      </div>
    {:else}
      <div class="cards">
        {#each projectsList as project, i (project.id)}
          <Project {...project} />
        {/each}
      </div>
    {/if}
  </section>

  <div class="justify-center">
    <Button>
      <svg src="images/icons/book-open.svg" class="mr" />
      see past projects
    </Button>
  </div>

  <p class="link-bottom padded">
    What’s so cool about being a volunteer? The
    <nuxt-link to="/store">InnoStore</nuxt-link>
    has your answers!
  </p>
</Layout>
