<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
</script>

<Header />
<div class="material">
  <slot />
</div>

<Footer />
