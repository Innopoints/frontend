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
      img: String,
      title: String,
      subtitle: String,
    }
  };
</script>
