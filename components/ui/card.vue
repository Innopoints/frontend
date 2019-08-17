<template>
  <div :class="{'with-image' : img}" class="card">
    <div class="image">
      <slot name="image">
        <img
          v-if="img"
          :src="img"
          :style="'background: ' + color"
          class="image"
        />
      </slot>
      <slot name="radio" />
    </div>
    <div v-if="img" class="content">
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      img: {
        type: [String, Boolean],
        default: '',
      },
      color: {
        type: String,
        default: '#FFF',
      },
    },
  };
</script>

<style scoped>
  .card .image img {
    width: 100%;
  }
</style>
