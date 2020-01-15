<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  const productLimit = 24;

  export async function preload(page, session) {
    let { account, products, colors } = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['products', `/products?limit=${productLimit}`],
      ['colors', `/colors`],
    ]));
    return { products: products.data, pages: products.pages, colors, account };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import Tagline from '@/containers/store/tagline.svelte';
  import Balance from '@/components/store/balance.svelte';
  import Filters from '@/containers/store/filters.svelte';
  import ProductCard from '@/components/store/product-card.svelte';
  import Pagination from '@/components/common/pagination.svelte';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { orderLabels, orderOptions } from '@/constants/store/order.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let products;
  export let pages;
  export let colors;
  export let account;
  $session.user = account;

  let balance;
  let order = orderOptions[0];
  let orderLabel = orderLabels[0];
  let currentPage = 1;

  let filterElement;

  if ($session.user != null) {
    balance = $session.user.balance;
  }

  function updateProducts(filtering) {
    let queryArgs = new Map();

    if (filtering.searchQuery) {
      queryArgs.set('q', filtering.searchQuery);
    }
    if (filtering.minPrice != null) {
      queryArgs.set('min', filtering.minPrice);
    }
    if (filtering.maxPrice != null) {
      queryArgs.set('max', filtering.maxPrice);
    }
    let excludedColors = filtering.excludedColors.map(color => color.slice(1));
    if (filtering.colorlessExcluded) {
      excludedColors.push(null);
    }
    if (excludedColors.length !== 0) {
      queryArgs.set('excluded_colors', JSON.stringify(excludedColors));
    }
    queryArgs.set('order_by', filtering.order.orderBy);
    queryArgs.set('order', filtering.order.order);
    queryArgs.set('limit', productLimit);
    queryArgs.set('page', currentPage);
    api.get(`/products?${generateQueryString(queryArgs)}`)
      .then(newProducts => { ({ pages, products } = newProducts); });
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
    <Tagline isAdmin={$session.user != null && $session.user.is_admin} />
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
            <img class="picture" src="images/store/no-products.svg" alt="" />
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
            <ProductCard {...product} />
          {/each}
        </div>
      {/if}
      <Pagination {pages} {currentPage} on:page-switch={handlePageSwitch} />
    </section>
    <p class="link-bottom padded">
      Lacking innopoints?
      <a href="/projects" rel="prefetch">Volunteer on projects</a>
      to fill in the shortage!
    </p>
  </div>
</Layout>
