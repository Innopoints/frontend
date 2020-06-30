<script>
  import { stores } from '@sapper/app';
  import { SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import Header from 'src/components/header.svelte';
  import Footer from 'src/components/footer.svelte';

  const { page } = stores();
  const productPagePattern = /^\/products\/[0-9]+$/;

  export let segment;
</script>

<SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT}>
  {#if segment == null}
    <slot />
  {:else}
    <Header
      class={productPagePattern.test($page.path) && 'hide-on-less-tb'}
      profile={(/^(?:profile|dashboard)/).test(segment)}
    />
    <slot />
    <Footer />
  {/if}
</SnackbarContainer>
