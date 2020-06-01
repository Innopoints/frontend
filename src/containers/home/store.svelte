<script>
  import { H2 } from 'attractions';
  import ProductCard from '@/components/products/product-card.svelte';

  export let products;

  function filterProps(props) {
    const newProps = Object.assign({}, props);
    delete newProps.addition_time;
    return newProps;
  }
</script>

{#if products && products.length !== 0}
  <section class="store container">
    <H2>How to spend innopoints?</H2>

    <div class="subtitle padded">
      The following items are the most popular among students.
      <br />
      Grab ‘em while they’re hot!
    </div>

    <div class="cards">
      {#each products as product (product.id)}
        <ProductCard {...filterProps(product)} short />
      {/each}
    </div>

    <div class="own-designs">
      Bright ideas for new merch are always welcome, so get in touch with us if
      you have some!
    </div>
  </section>
{/if}

<style src="../../../static/css/containers/home/store.scss"></style>
