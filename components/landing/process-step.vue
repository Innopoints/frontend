<template>
  <div class="container">
    <img :src="img" />
    <div class="description">
      <span class="title">{{ title }}</span>
      <span class="subtitle">{{ subtitle }}</span>
      <Button
        v-if="buttonLink"
        :label="buttonText"
        :away="external"
        :href="buttonLink"
        :img="external ? '/images/landing/external-link.svg' : ''"
        link
        filled
      />
      <strong v-else>{{ buttonText }}</strong>
    </div>
  </div>
</template>

<script>
  import Button from '../ui/button';

  export default {
    components: { Button },
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
