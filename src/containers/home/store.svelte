<script>
  import ProductCard from '@/components/store/product-card.svelte';

  export let products;
</script>

<section class="store container">
  <h2>How to spend innopoints?</h2>

  <div class="subtitle padded">
    The following items are the most popular among students.
    <br />
    Grab ‘em while they’re hot!
  </div>

  <div class="cards">
    {#each products as product (product.id)}
      <ProductCard {...product} short />
    {/each}
  </div>

  <div class="own-designs">
    Bright ideas for new merch are always welcome, so get in touch with us if
    you have some!
  </div>
</section>
