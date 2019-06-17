<template>
  <div>
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
  import Footer from '../components/footer';

  export default {
    head: {
      link: [
        { rel: 'stylesheet', href: '/css/landing.css'}
      ]
    },
    components: {
      Footer
    }
  };
</script>
