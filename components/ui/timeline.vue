<template>
  <div class="timeline">
    <div v-for="item in items" :class="item.important ? 'important' : ''" class="entry">
      <div class="icon">
        <!--eslint-disable-next-line-->
        <img :src="image(item)" alt="" />
      </div>
      <div class="content">
        {{ content(item) }}
      </div>
    </div>

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
      items: {
        type: Array,
        required: true
      },
      load: {
        type: Boolean,
        default: false
      },
      handleLoad: Function
    },
    computed: {

    },
    methods: {
      handleLoadClick() {
        if(this.handleLoad) this.handleLoad();
      },
      // Try to make it svg
      // svg(item) {
      //   if(item.icon) return () => import('../../static' + item.icon);
      //   return '';
      // },
      image(item) {
        if(item.icon) return item.icon;
        return '/images/events/calendar.svg';
      },
      content(item) {
        if(item.content) return item.content;
        return 'No content here';
      }
    }
  };
</script>
