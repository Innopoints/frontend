<script>
  import Layout from 'src/layouts/default.svelte';
  import Error404 from 'src/containers/errors/error-404.svelte';
  import Error403 from 'src/containers/errors/error-403.svelte';
  import Error500 from 'src/containers/errors/error-500.svelte';

  export let error;
  export let status;
</script>

<svelte:head>
  {#if status == 404}
    <title>Page not found – Innopoints</title>
  {:else if status == 403}
    <title>{error.message} – Innopoints</title>
  {:else}
    <title>Something went wrong...</title>
  {/if}
</svelte:head>

<Layout>
  {#if status == 404}
    <Error404 />
  {:else if status == 403}
    <Error403 message={error.message} />
  {:else}
    <Error500 {error} />
  {/if}
</Layout>

<style src="../../static/css/routes/_error.scss"></style>
