<script context="module">
  import * as api from '@/utils/api.js';
  const productLimit = 24;

  export async function preload() {
    const { pages, data } = await api.get(`/products?limit=${productLimit}`);
    const colors = await api.get('/colors');
    return { products: data, colors, pages };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/store/tagline.svelte';
  import Balance from '@/components/store/balance.svelte';
  import Filters from '@/containers/store/filters.svelte';
  import StoreCard from '@/components/store/card.svelte';
  import Pagination from '@/components/common/pagination.svelte';

  const orderOptions = [
    { orderBy: 'addition_time', order: 'asc' },
    { orderBy: 'addition_time', order: 'desc' },
    { orderBy: 'price', order: 'asc' },
    { orderBy: 'price', order: 'desc' },
  ];
  const orderLabels = [
    'newest first',
    'newest last',
    'cheapest first',
    'cheapest last',
  ];

  const { session } = stores();

  export let products;
  export let pages;
  export let colors;

  let balance;
  let order = orderOptions[0];
  let orderLabel = orderLabels[0];
  let currentPage = 1;

  let filterElement;

  try {
    balance = $session.user.balance;
  } catch (e) {
    balance = 1;
  }

  function updateProducts(filtering) {
    let query = [];
    if (filtering.searchQuery) {
      query.push(`q=${filtering.searchQuery}`);
    }
    if (filtering.minPrice != null) {
      query.push(`min=${filtering.minPrice}`);
    }
    if (filtering.maxPrice != null) {
      query.push(`max=${filtering.maxPrice}`);
    }
    let excludedColors = filtering.excludedColors.map(color => color.slice(1));
    if (filtering.colorlessExcluded) {
      excludedColors.push('null');
    }
    if (excludedColors.length !== 0) {
      query.push(`excluded_colors=${excludedColors.join(',')}`);
    }
    query.push(`order_by=${filtering.order.orderBy}`);
    query.push(`order=${filtering.order.order}`);
    let queryString = `limit=${productLimit}`;
    if (query) {
      queryString += '&' + query.join('&');
    }
    queryString += `&page=${currentPage}`;
    console.log(queryString);
    api.get(`/products?${queryString}`)
      .then(newProducts => { ({ pages, products} = newProducts); });
  }

  function handlePageSwitch(evt) {
    currentPage = evt.detail;
    updateProducts(filterElement.getLastFiltering());
  }
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
</svelte:head>

<Layout>
  <div class="material">
    <Tagline />
    <section class="shop padded">
      <Balance value={balance} />
      <Filters
        {order} {orderLabel} {colors} {orderOptions} {orderLabels} {balance}
        on:change-filters={(event) => updateProducts(event.detail)}
        bind:this={filterElement}
      />
      {#if !products || products.length === 0}
        <div class="empty">
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
          <hr data-text="All items" />
          {#each products as product (products.id)}
            <StoreCard {...product} />
          {/each}
        </div>
      {/if}
      <Pagination {pages} {currentPage} on:page-switch={handlePageSwitch} />
    </section>
    <p class="link-bottom padded">
      Lacking innopoints?
      <a href="/projects">Volunteer on projects</a>
      to fill in the shortage!
    </p>
  </div>
</Layout>
