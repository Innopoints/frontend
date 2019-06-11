<template functional>
  <div class="card shadow-2">
    <img :src="props.img" :style="{background: props.backgroundColor}" />
    <div
      :style="{background: props.color}"
      class="text-block"
    >
      <div class="title">
        {{ props.title }}
      </div>
      <span class="subtitle">
        {{ props.subtitle }}
      </span>
      <a
        :style="{color: props.color}"
        :href="props.buttonURL"
        class="btn filled white shadow-2"
      >view</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      title: String,
      subtitle: String,
      color: String,
      backgroundColor: String,
      buttonURL: {
        type: String,
        default: '#'
      },
    },
  };
</script>
