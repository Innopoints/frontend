<template>
  <div class="card shadow-2">
    <img :src="img" :style="{'background-color': background}" />
    <div
      :style="{'background-color': color}"
      class="text-block"
    >
      <div class="title">
        {{ title }}
      </div>
      <span class="subtitle">
        {{ subtitle }}
      </span>
      <a
        :style="{'color': color}"
        :href="buttonURL"
        v-ripple="'rgba(50, 50, 50, 0.25)'"
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
      buttonURL: {
        type: String,
        default: '#'
      },
    },
    computed: {
      background() {
        return {
          '#A52222': '#FFF0F0',
          '#217E93': '#F5FDFF',
          '#7A7A7A': '#F6F6F6',
        }[this.color];
      }
    }
  };
</script>
