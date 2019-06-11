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
      backgroundColor: String,      // to be removed
      buttonURL: {
        type: String,
        default: '#'
      },
    },
    computed: {
      background() {
        return this.backgroundColor;  // remove this once the rest of the function is finalized
        let color = this.color;
        if(color.startsWith('#')) {
          let r=0, g=0, b=0;
          if(color.length === 7) {
            r = parseInt(color.substring(1,3), 16);
            g = parseInt(color.substring(3,5), 16);
            b = parseInt(color.substring(5,7), 16);
          } else if (color.length === 4) {
            r = parseInt(color.charAt(1), 16);
            g = parseInt(color.charAt(2), 16);
            b = parseInt(color.charAt(3), 16);
          } else {
            throw `Unknown color string: ${color}`;
          }
          return `rgba(${r}, ${g}, ${b}, 0.15)`;
        }
        return undefined;
      }
    }
  };
</script>
