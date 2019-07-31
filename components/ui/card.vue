<template>
  <div :class="img ? 'with-image' : ''" class="card">
    <div class="image">
      <img
        v-if="img"
        :src="img"
        :style="'background: ' + color"
        class="image"
      />
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
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: '#FFF',
      },
    },
  };
</script>
