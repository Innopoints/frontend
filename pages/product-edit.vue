<template>
  <div>
    <h1 class="padded">
      Create a Product
    </h1>
    <main class="padded">
      <ProductEditForm />
      <ProductEditPreview />
    </main>
  </div>
</template>

<script>
  import ProductEditForm from '../containers/product-edit/form';
  import ProductEditPreview from '../containers/product-edit/preview';

  export default {
    components: {
      ProductEditPreview,
      ProductEditForm
    },
    head: {
      title: 'Product Edit',
      meta: [
        { hid: 'description', name: 'description', content: `Create or edit the product from InnoStore` }
      ]
    },
  };
</script>

<style lang="scss" src="../static/css/product-edit/index.scss" />
