<script>
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/store/tagline.svelte';
  import StoreCard from '@/components/store/card.svelte';
  import items from '@/constants/store/store';
  import Filters from '@/containers/store/filters.svelte';
  import Ordering from '@/containers/store/ordering.svelte';
</script>

<svelte:head>
  <title>Store – Innopoints</title>

  <!-- Store styles -->
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/page-components/tagline.css" />
  <link rel="stylesheet" href="css/page-components/filters.css" />
  <link rel="stylesheet" href="css/page-components/empty-state.css" />
  <link rel="stylesheet" href="css/store/filters-spec.css" />
  <link rel="stylesheet" href="css/store/main.css" />
  <link rel="stylesheet" href="css/page-components/pagination.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />

  <!-- Projects styles -->
  <link rel="preload" href="css/projects/filters-spec.css" as="style" />
  <link rel="preload" href="css/projects/main.css" as="style" />

  <!-- Home styles -->
  <link rel="preload" href="css/home/main.css" as="style" />
  <link rel="preload" href="css/home/header.css" as="style" />
  <link rel="preload" href="css/home/tagline.css" as="style" />
  <link rel="preload" href="css/home/how-to.css" as="style" />
  <link rel="preload" href="css/home/options.css" as="style" />
  <link rel="preload" href="css/home/store.css" as="style" />
  <link rel="preload" href="css/home/contacts.css" as="style" />
</svelte:head>

<Layout>
  <Tagline />

  <section id="store-top" class="shop padded">
    <Filters />
    <Ordering />

    {#if items.length === 0}
      <div lass="empty">
        <figure>
          <img class="picture" src="/images/store/no-products.svg" alt="" />
          <figcaption>
            <div class="title">No items found...</div>
            Try raiding 319 or a different filter
          </figcaption>
        </figure>
      </div>
    {:else}
      <div class="cards">
        {#each items as item, i (item.id)}
          <StoreCard {...item} />
        {/each}
      </div>
    {/if}

    <!--<Pagination v-model="currentPage" :pageCount="pageCount" />-->
  </section>

  <p class="link-bottom padded">
    Lacking innopoints?
    <a href="/projects">Volunteer on projects</a>
    to fill in the shortage!
  </p>
</Layout>
