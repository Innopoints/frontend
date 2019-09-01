<template>
  <div class="timeline">
    <slot />

    <button
      v-if="load"
      @click="handleLoadClick"
      v-ripple="'rgba(56, 120, 0, .25)'"
      type="button"
      class="btn more"
    >
      <MoreIcon class="icon mr-2" />
      more
    </button>
  </div>
</template>

<script>
  import MoreIcon from '@/static/images/icons/more-horizontal.svg';

  export default {
    name: 'Timeline',
    components: {
      MoreIcon,
    },
    props: {
      load: {
        type: Boolean,
        default: false,
      },
      handleLoad: Function,
    },
    methods: {
      handleLoadClick() {
        if (this.handleLoad) this.handleLoad();
      },
    },
  };
</script>
