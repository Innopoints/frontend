<script context="module">
  import items from '@/constants/store/store';
  export function preload({params}) {
    const item = items.find(x => parseInt(x.id) === parseInt(params.id));
    if (!item) return this.redirect(302, 'store');
    return {...item};
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import Button from 'ui/button.svelte';
  import Images from '@/containers/product/image-previews.svelte';
  import ItemContent from '@/containers/product/item-content.svelte';
  import {user, isAuthed} from '@/store/user';

  export let name;
  export let type;
  export let description;
  export let price;
  export let purchases;
  export let inSizes;
  export let varieties = [];
  $: variety = varieties[0];
  const changeVariety = e => variety = varieties.find(x => x.color === e.detail.color);
</script>

<svelte:head>
  <title>{name} – Innopoints</title>

  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/view-product/main.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css" />

  <!-- Store styles -->
  <link rel="preload" as="style" href="css/page-components/tagline.css" />
  <link rel="preload" as="style" href="css/page-components/filters.css" />
  <link rel="preload" as="style" href="css/page-components/empty-state.css" />
  <link rel="preload" as="style" href="css/store/filters-spec.css" />
  <link rel="preload" as="style" href="css/store/main.css" />
  <link rel="preload" as="style" href="css/page-components/pagination.css" />

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
  <main class="product">
    <Button href="/store" classname="back btn">
      <svg src="/images/icons/arrow-left.svg" class="" />
      <span>to the InnoStore</span>
    </Button>
    <div class="balance">
      {#if $isAuthed && $user.balance}
        you have {$user.balance} <svg src="/images/innopoint-sharp.svg" class="innopoint" />
      {/if}
    </div>
    <Images {varieties} {variety} />
    <ItemContent
        {name} {type} {description} {inSizes} {varieties} {variety} {price} {purchases}
        on:change={changeVariety}
    />
  </main>
</Layout>
