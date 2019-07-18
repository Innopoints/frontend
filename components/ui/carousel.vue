<template>
  <div class="carousel">
    <div class="curr-slide">
      <img :src="images[current]" />
    </div>
    <div v-if="!hideIndicators" class="slides">
      <label
        v-for="i in images.length"
        :key="i"
        class="slide"
      >
        <input
          :checked="current === i-1"
          @click="current = i-1"
          :value="i-1"
          type="radio"
          name="photos"
        />
        <!--eslint-disable-next-line-->
        <div class="icon"></div>
      </label>
    </div>
    <template v-if="images.length > 1 && !hideControls">
      <button @click="prev" class="btn round prev-slide">
        <img src="/images/ui-kit/chevron-left-white.svg" />
      </button>
      <button @click="next" class="btn round next-slide">
        <img src="/images/ui-kit/chevron-right-white.svg" />
      </button>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      images: {
        type: Array,
        validator(val) {
          if(!Array.isArray(val))
            return false;
          if(!val.every(item => typeof item === 'string'))
            return false;
          return true;
        },
        required: true,
      },
      hideControls: {
        type: Boolean,
        default: false,
      },
      hideIndicators: {
        type: Boolean,
        default: false,
      },
      interval: {
        type: Number,
        required: false,
      }
    },
    data() {
      return {
        current: 0,
        timerId: 0,
      };
    },
    watch: {
      interval: {
        immediate: true,
        handler(time) {
          if(this.timerId) {
            clearInterval(this.timerId);
          }
          if(!time)
            return;
          this.timerId = setInterval(this.next, time);
        }
      }
    },
    methods: {
      next() {
        this.current++;
        this.current = this.current % this.images.length;
      },
      prev() {
        this.current--;
        if(this.current < 0) {
          this.current = this.images.length - 1;
        }
      },
    },
  };
</script>
