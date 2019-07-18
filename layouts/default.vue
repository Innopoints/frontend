<template>
  <div>
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
      Footer
    }
  };
</script>

<style src="../static/css/header.css" />
<style src="../static/css/events.css" />
