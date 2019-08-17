<template>
  <div class="timeline">
    <slot />

    <button v-if="load" @click="handleLoadClick" class="more">
      <div class="icon">
        <More />
      </div>
      load more
    </button>
  </div>
</template>

<script>
  import More from '@/static/images/icons/more-horizontal.svg';

  export default {
    name: 'Timeline',
    components: {
      More,
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
        if(this.handleLoad) this.handleLoad();
      },
    },
  };
</script>
