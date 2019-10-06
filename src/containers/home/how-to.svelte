<script>
  import HowToCard from '@/components/home/how-to-card.svelte';
  import howTos from '@/constants/home/how-tos';
</script>

<section class="how-to">
  <h2>How does it work?</h2>
  <div class="container">
    {#each howTos as howTo, i (howTo.title)}
      <HowToCard {...howTo} />
      {#if i !== 2}
        <svg src="images/icons/arrow-down.svg" class="arrow" />
      {/if}
    {/each}
  </div>
</section>
