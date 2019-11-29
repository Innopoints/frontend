<script>
  import Layout from '@/layouts/default.svelte';
  import Form from '@/containers/item/edit-form.svelte';
  import Preview from '@/containers/item/item-preview.svelte';
</script>

<svelte:head>
  <title>Create product – Innopoints</title>

  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/create-product/main.css" />
  <link rel="stylesheet" href="css/create-product/preview-card.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
</svelte:head>

<Layout>
  <h1 class="padded">
    Create a Product
  </h1>
  <main class="padded">
    <Form />
    <Preview />
  </main>
</Layout>
