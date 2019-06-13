<template>
  <div class="card shadow-2">
    <img :src="img" />
    <span class="title">{{ title }}</span>
    <span class="subtitle">{{ subtitle }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      title: String,
      subtitle: String,
    }
  };
</script>
