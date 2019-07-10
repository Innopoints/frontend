<template>
  <!--eslint-disable-next-line-->
  <component
    :is="link ? 'a' : 'button'"
    :class="['btn', filled && 'filled', outline && 'outline', danger && 'danger', round && 'round', normal && 'normal']"
    v-if="link"
    :href="href"
    v-else
    :disabled="disabled"
  >
    <template v-if="badge">
      <div class="badge">
        <img :src="img" class="mr" alt="" />
      </div>
    </template>

    <template v-else>
      <img :src="img" class="mr" alt="" />
    </template>

    <slot />
  </component>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      link: {
        type: Boolean,
        default: false
      },
      href: {
        type: String,
        default: '#'
      },
      img: {
        type: String,
        default: null
      },
      filled: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: false
      },
      danger: {
        type: Boolean,
        default: false
      },
      badge: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      normal: {
        type: Boolean,
        default: false
      },
    }
  };
</script>
