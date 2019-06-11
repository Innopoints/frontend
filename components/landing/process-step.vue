<template functional>
  <div class="container">
    <img :src="props.img" />
    <div class="description">
      <h3 class="title">{{ props.title }}</h3>
      <p class="subtitle">{{ props.subtitle }}</p>
      <nuxt-link :to="props.buttonLink" class="btn filled green shadow-1">{{ props.buttonText }}</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      title: String,
      subtitle: String,
      buttonLink: {
        type: String,
        default: '#',
      },
      buttonText: String,
    },
  };
</script>
