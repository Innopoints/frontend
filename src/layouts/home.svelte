<script>
  import Header from '@/containers/home/header.svelte';
  import Footer from '@/components/footer.svelte';
</script>

<div class="material">
  <Header />
  <slot />
</div>

<Footer />
