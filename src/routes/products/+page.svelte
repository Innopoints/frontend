<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';
  const productLimit = 24;

  export async function preload(page, session) {
    const { products, colors } = await getInitialData(this, session, new Map([
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
  import Tagline from 'src/containers/products/tagline.svelte';
  import Balance from 'src/components/products/balance.svelte';
  import Filters from 'src/containers/products/filters.svelte';
  import { Divider, Pagination } from 'attractions';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import ProductCard from 'src/components/products/product-card.svelte';
  import NotificationTypes from 'src/constants/backend/notification-types.js';
  import orderOptions from 'src/constants/products/order.js';
  import { filterProps } from 'src/utils/product-manipulation.js';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let products;
  export let pages;
  export let colors;
  export let account;

  const balance = account && account.balance;
  const selectedOrder = orderOptions[0];
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

  async function updateProducts(filtering) {
    const query = new Map();

    if (filtering.searchQuery) {
      query.set('q', filtering.searchQuery);
    }
    if (filtering.minPrice != null) {
      query.set('min_price', filtering.minPrice);
    }
    if (filtering.maxPrice != null) {
      query.set('max_price', filtering.maxPrice);
    }

    const excludedColors = filtering.excludedColors.map(color => color.slice(1));
    if (!filtering.colorlessIncluded) {
      excludedColors.push('\0');
    }
    if (excludedColors.length !== 0) {
      query.set('excluded_colors', excludedColors);
    }
    query.set('order_by', filtering.order.value.orderBy);
    query.set('order', filtering.order.value.order);
    query.set('limit', productLimit);
    query.set('page', currentPage);

    try {
      ({ pages, data: products } = await api.json(api.get('/products', { query })));
    } catch (e) {
      console.error(e);
    }
  }

  function handlePageSwitch({ detail }) {
    currentPage = detail.value;
    updateProducts(filterElement.getLastFiltering());
  }
</script>

<svelte:head>
  <title>Store – Innopoints</title>
  <meta name="og:title" content="InnoStore" />
  <meta name="og:url" content="https://ipts.innopolis.university/products" />
  <meta name="og:description" content="The place where your hard work and proactivity turns into cool merch of Innopolis University" />
</svelte:head>

<div class="material">
  <Tagline {account} />
  <section class="shop padded">
    <Balance value={balance} />
    <Filters
      {selectedOrder} {colors} {orderOptions} {balance}
      on:change-filters={(event) => { currentPage = 1; updateProducts(event.detail); }}
      bind:this={filterElement}
    />
    {#if products.length === 0}
      <EmptyState>
        <figure>
          <img loading="lazy" class="picture" src="/images/products/no-products.svg" alt="" />
          <figcaption>
            <div class="title">No items found...</div>
            Try whining to 319 or a different filter
          </figcaption>
        </figure>
      </EmptyState>
    {:else}
      <div class="cards">
        {#if newArrivals != null}
          <Divider text="New arrivals" />
          {#each newArrivals as product (product.id)}
            <ProductCard {...filterProps(product)} />
          {/each}
        {/if}
        <Divider text="All items" />
        {#each products as product (product.id)}
          <ProductCard {...filterProps(product)} />
        {/each}
      </div>
    {/if}
    <Pagination {pages} {currentPage} on:change={handlePageSwitch} showLonePage={false} />
  </section>
  <p class="link-bottom padded">
    Lacking innopoints?
    <a href="/projects" sapper:prefetch>Volunteer on projects</a>
    to fill in the shortage!
  </p>
</div>

<style src="../../../static/css/routes/products/index.scss"></style>
