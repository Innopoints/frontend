<template>
  <div :id="$route.name">
    <Header />
    <template v-if="auth">
      <nuxt />
    </template>
    <Error403 v-else />
    <Footer />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Footer from '../components/footer';
  import Header from '../components/header';
  import Error403 from '../containers/403';

  export default {
    components: {
      Error403,
      Header,
      Footer,
    },
    computed: {
      ...mapState({
        auth: state => state.user.isAuth,
      }),
    },
  };
</script>
