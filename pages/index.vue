<template>
  <div>
    <header class="container">
      <img src="/images/landing/innou-logo-text.png" class="logo" />
      <nuxt-link to="/" class="btn outline green mdc-button">sign in</nuxt-link>
    </header>

    <section class="container narrow tagline">
      <img src="/images/landing/voxel-city-tablet.png" />
      <div>
        <h1>Innopoints.</h1>
        <span>Motivating the great beginnings</span>
        <nav>
          <nuxt-link to="/" class="btn filled green shadow-1">get innopoints</nuxt-link>
          <nuxt-link to="/" class="btn outline green">see the InnoStore</nuxt-link>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        title: 'Home',
        meta: [
          { hid: 'description', name: 'description', content: `Innopolis Unniversity's innopoints project` }
        ],
        link: [
          { rel: 'stylesheet', href: '/css/landing.css'}
        ]
      };
    }
  };
</script>

