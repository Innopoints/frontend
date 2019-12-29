<script>
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';

  export let classname = '';
</script>

<Header />
<div class="material {classname}">
  <slot />
</div>

<Footer />
