<script>
  import StoreCard from '@/components/store/card.svelte';
  import items from '@/constants/store/store';
  const topItems = items.slice(0, 3);
</script>

<section class="store container">
  <h2>How to spend innopoints?</h2>

  <div class="subtitle padded">
    The following items are the most popular among students.
    <br />
    Grab ‘em while they’re hot!
  </div>

  <div class="cards">
    {#each topItems as item, i (item.id)}
      <StoreCard
        {...{ id: item.id, name: item.name, type: item.type, varieties: item.varieties, price: item.price }}
        short />
    {/each}
  </div>

  <div class="own-designs">
    Bright ideas for new merch are always welcome, so get in touch with us if
    you have some!
  </div>
</section>
