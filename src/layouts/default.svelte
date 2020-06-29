<script>
  import { stores } from '@sapper/app';
  import Header from 'src/components/header.svelte';
  import Footer from 'src/components/footer.svelte';

  const { page } = stores();

  export let user = null;
  export let headerClass = null;
</script>

<Header class={headerClass} {user} profile={(/^\/(?:profile|dashboard)/).test($page.path)} />

<slot />

<Footer />
