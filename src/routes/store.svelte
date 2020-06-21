<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';
  const productLimit = 24;

  export async function preload(page, session) {
    let { products, colors } = await getInitialData(this, session, new Map([
      ['products', `/products?limit=${productLimit}`],
      ['colors', `/colors`],
    ]));
    return {
      account: session.account,
      products: products != null ? products.data : [],
      pages: products != null ? products.pages : 0,
      colors,
    };
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
  import NotificationTypes from '@/constants/backend/notification-types.js';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { orderLabels, orderOptions } from '@/constants/store/order.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let products;
  export let pages;
  export let colors;
  export let account;

  let balance;
  let order = orderOptions[0];
  let orderLabel = orderLabels[0];
  let currentPage = 1;

  let newArrivals = null;
  $: {
    if (currentPage === 1 && $session.notifications != null) {
      const newArrivalsNotification = $session.notifications.find(
        notification => notification.type === NotificationTypes.NEW_ARRIVALS,
      );

      if (newArrivalsNotification != null) {
        api.json(api.patch(
          `/notifications/${newArrivalsNotification.id}/read`,
          { csrfToken: $session.account.csrf_token },
        )).then(() => {
          newArrivalsNotification.is_read = true;
          $session = $session;
        }).catch(console.error);

        const threshold = new Date(newArrivalsNotification.timestamp);
        threshold.setDate(threshold.getDate() - 1);
        newArrivals = products.filter(product => new Date(product.addition_time) > threshold);
      }
    } else {
      newArrivals = null;
    }
  }

  let filterElement;

  if (account != null) {
    balance = account.balance;
  }

  function updateProducts(filtering) {
    let queryArgs = new Map();

    if (filtering.searchQuery) {
      queryArgs.set('q', filtering.searchQuery);
    }
    if (filtering.minPrice != null) {
      queryArgs.set('min_price', filtering.minPrice);
    }
    if (filtering.maxPrice != null) {
      queryArgs.set('max_price', filtering.maxPrice);
    }
    let excludedColors = filtering.excludedColors.map(color => color.slice(1));
    if (filtering.colorlessExcluded) {
      excludedColors.push('\0');
    }
    if (excludedColors.length !== 0) {
      queryArgs.set('excluded_colors', excludedColors);
    }
    queryArgs.set('order_by', filtering.order.orderBy);
    queryArgs.set('order', filtering.order.order);
    queryArgs.set('limit', productLimit);
    queryArgs.set('page', currentPage);
    api.get(`/products?${generateQueryString(queryArgs)}`)
      .then(resp => resp.json()).then((newProducts) => {
        ({ pages, data: products } = newProducts);
      }).catch(console.error);
  }

  function handlePageSwitch(evt) {
    currentPage = evt.detail;
    updateProducts(filterElement.getLastFiltering());
  }

  function filterProps(props) {
    let newProps = Object.assign({}, props);
    delete newProps.addition_time;
    return newProps;
  }
</script>

<svelte:head>
  <title>Store – Innopoints</title>
  <meta name="og:title" content="InnoStore" />
  <meta name="og:url" content="https://ipts.innopolis.university/store" />
  <meta name="og:description" content="The place where your hard work and proactivity turns into cool merch of Innopolis University" />

  <link rel="stylesheet" href="/css/bundles/store.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/products-new.min.css" />
  <link rel="prefetch" as="style" href="/css/bundles/products-id.min.css" />
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
    <Tagline isAdmin={account != null && account.is_admin} />
    <section class="shop padded">
      <Balance value={balance} />
      <Filters
        {order} {orderLabel} {colors} {orderOptions} {orderLabels} {balance}
        on:change-filters={(event) => { currentPage = 1; updateProducts(event.detail); }}
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
          {#if newArrivals != null}
            <hr data-text="New arrivals" />
            {#each newArrivals as product (product.id)}
              <ProductCard {...filterProps(product)} />
            {/each}
          {/if}
          <hr data-text="All items" />
          {#each products as product (product.id)}
            <ProductCard {...filterProps(product)} />
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
