<template>
  <div class="container">
    <img :src="img" />
    <div class="description">
      <h3 class="title">{{ title }}</h3>
      <p class="subtitle">{{ subtitle }}</p>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component
        v-if="buttonLink"
        :is="external ? 'a' : 'nuxt-link'"
        :href="buttonLink"
        :target="external ? '_blank': '_self'"
        :to="buttonLink"
        v-ripple
        class="btn filled green shadow-1"
      >
        {{ buttonText }}
        <img v-if="external" src="/images/landing/external-link.svg" class="ml-1" />
      </component>
      <strong v-else>{{ buttonText }}</strong>
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
