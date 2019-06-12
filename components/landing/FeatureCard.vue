<template functional>
  <div class="card">
    <img :src="props.img"/>
    <div class="description">
      <h3 class="title">{{ props.title }}</h3>
      <p class="subtitle">{{ props.subtitle }}</p>
    </div>
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