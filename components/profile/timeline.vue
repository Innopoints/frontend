<template>
  <div class="timeline">
    <slot />

    <Button
      v-if="load"
      @click="handleLoadClick"
      img="/images/icons/more-horizontal.svg"
      label="load more"
      class="more"
    />
  </div>
</template>

<script>
  import Button from '@/components/ui/button';

  export default {
    name: 'Timeline',
    components: {
      Button,
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
