<template>
  <Card>
    <!--eslint-disable-next-line-->
    <component :is="svg" class="icon" viewBox="0 0 24 24" />
    <span class="title">{{ title }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </Card>
</template>

<script>
  import Card from '../ui/card';

  export default {
    components: { Card },
    props: {
      img: String,
      title: String,
      subtitle: String,
    },
    computed: {
      svg() {
        if(this.img) return () => import('../../static' + this.img);
        return '';
      },
    },
  };
</script>
