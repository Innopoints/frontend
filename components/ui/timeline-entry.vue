<template>
  <div :class="important ? 'important' : ''" class="entry">
    <div class="icon">
      <!--eslint-disable-next-line-->
      <component :is="svg" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimelineEntry',
    props: {
      icon: {
        type: String,
        default: '/images/icons/calendar.svg',
      },
      important: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      svg() {
        return () => import('../../static' + this.icon);
      },
    },
  };
</script>
