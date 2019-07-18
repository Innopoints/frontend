<template>
  <div class="timeline">
    <slot />

    <button v-if="load" @click="handleLoadClick" class="more">
      <div class="icon">
        <img src="/images/events/more.svg" />
      </div>
      load more
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Timeline',
    props: {
      load: {
        type: Boolean,
        default: false
      },
      handleLoad: Function
    },
    methods: {
      handleLoadClick() {
        if(this.handleLoad) this.handleLoad();
      }
    }
  };
</script>
