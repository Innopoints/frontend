<template>
  <div :class="img ? 'with-image' : ''" class="card">
    <img v-if="img" src="img" />
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
        default: ''
      }
    }
  };
</script>
