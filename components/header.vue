<template>
  <header>
    <div class="container">
      <div @click="resolution" class="logo">
        <img src="/images/browser/innou-icon-green.svg" />
        <span class="hide-mb">Innopoints</span>
      </div>
      <nuxt-link class="btn outline green" to="#">sign in</nuxt-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      resolution: () => {
        alert(`You current browser screen resolution.
        Width: ${window.innerWidth}px, height: ${window.innerHeight}px`);
      }
    }
  };
</script>
