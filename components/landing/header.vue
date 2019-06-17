<template>
  <header class="container">
    <img @click="resolution" src="/images/landing/innou-logo-text.png" class="logo" />
    <nuxt-link v-ripple to="/" class="btn outline green mdc-button">sign in</nuxt-link>
  </header>
</template>

<script>
  export default {
    name: "LandingHeader",
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      }
    }
  };
</script>
