<template>
  <div :id="$route.name">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
  import Footer from '../components/footer';
  import Header from '../components/header';

  export default {
    components: {
      Header,
      Footer,
    },
  };
</script>
