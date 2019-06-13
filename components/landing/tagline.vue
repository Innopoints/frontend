<template>
  <section class="container narrow tagline">
    <img src="/images/landing/voxel-city-tablet.png" />
    <div>
      <h1>Innopoints.</h1>
      <span>Motivating the great beginnings</span>
      <nav>
        <nuxt-link v-ripple to="/" class="btn filled green shadow-1">get innopoints</nuxt-link>

        <nuxt-link v-ripple to="/" class="btn outline green">see the InnoStore</nuxt-link>
      </nav>
    </div>
  </section>
</template>

<script>
  export default {
    name: "LandingTagline",
  };
</script>
