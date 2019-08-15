<template>
  <Card>
    <img :src="img" />
    <span class="title">{{ title }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </Card>
</template>

<script>
  import Card from '../ui/card';

  export default {
    components: { Card },
    props: {
      // TODO: transform img to svg
      img: String,
      title: String,
      subtitle: String,
    },
  };
</script>
