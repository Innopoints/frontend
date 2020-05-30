<script>
  import { stores } from '@sapper/app';
  import Header from '@/components/header.svelte';
  import Footer from '@/components/footer.svelte';
  export let user = null;

  const { page } = stores();
</script>

<Header {user} profile={(/^\/(?:profile|dashboard)/).test($page.path)} />

<slot />

<Footer />
