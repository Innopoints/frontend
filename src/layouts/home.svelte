<script>
  import Header from '@/components/home/header.svelte';
  import Footer from '@/components/footer.svelte';

  export let user = null;
</script>

<div class="material">
  <Header {user} />
  <slot />
</div>

<Footer />
