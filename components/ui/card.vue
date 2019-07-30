<template>
  <div :class="img ? 'with-image' : ''" class="card">
    <slot name="radio" />
    <!-- <div v-if="variations" class="image">
      <img
        v-if="img"
        :src="img"
        :style="'background: ' + color"
        class="image"
      />
      <div
        role="group"
        class="color-options"
      >
        <label
          v-for="variation in variations"
          :key="variation"
          :id="variation"
          class="radio colored"
        >
          <input type="radio" name="colors" checked="checked" />
          <div class="icon" />
        </label>
      </div>
    </div>
    <img
      v-else-if="img"
      :src="img"
      :style="'background: ' + color"
      class="image"
    /> -->
    <div v-if="img" class="content">
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      img: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: '#FFF',
      },
    },
  };
</script>
