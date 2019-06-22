<template>
  <header class="container landing">
    <img @click="resolution" src="/images/landing/innou-logo-text.png" class="logo" />
    <span
      @click="toggleAuth"
      v-ripple
      class="btn outline green mdc-button"
    >
      sign {{ isAuth ? 'out' : 'in' }}
    </span>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "LandingHeader",
    computed: mapState({
      isAuth: state => state.auth.isAuth
    }),
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'auth/toggleAuth'}),
    }
  };
</script>
