<template>
  <div id="default">
    <div class="material">
      <Header />
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Footer from '../components/footer';
  import Header from '../components/header';

  export default {
    components: {
      Header,
      Footer
    }
  };
</script>
