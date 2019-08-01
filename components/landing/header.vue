<template>
  <header class="container">
    <img @click="resolution" src="/images/landing/innou-logo-text.png" class="logo" />
    <Button
      :label="'sign ' + (isAuth ? 'out' : 'in')"
      @click="toggleAuth"
      outline
    />
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Button from '../ui/button';

  export default {
    name: "LandingHeader",
    components: { Button },
    computed: mapState({
      isAuth: state => state.auth.isAuth,
    }),
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      },
      ...mapActions({toggleAuth: 'auth/toggleAuth'}),
    },
  };
</script>
