<template functional>
  <div class="container">
    <img :src="props.img" />
    <div class="description">
      <h3 class="title">{{ props.title }}</h3>
      <p class="subtitle">{{ props.subtitle }}</p>
      <nuxt-link
        v-if="props.buttonLink"
        :to="props.buttonLink"
        class="btn filled green shadow-1"
      >
        {{ props.buttonText }}
        <img v-if="props.external" src="images/landing/external-link.svg" class="ml-1" />
      </nuxt-link>
      <strong v-else>{{ props.buttonText }}</strong>
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
      external: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  };
</script>
