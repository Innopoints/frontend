<template functional>
  <div class="card shadow-2">
    <img :src="props.img" />
    <span class="title">{{ props.title }}</span>
    <span class="subtitle">{{ props.subtitle }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      title: String,
      subtitle: String,
    },
  };
</script>
