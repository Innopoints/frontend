<template>
  <div :class="img ? 'with-image' : ''" class="card">
<!--     <img
      v-if="img"
      :src="img"
      :style="'background: ' + color"
      class="image"
    /> -->
    <div class="image">
      <img
        v-if="img"
        :src="img"
        :style="'background: ' + color"
        class="image"
      />
      <div role="group" class="color-optioins">
        <label class="radio colored" id="red">
          <input type="radio" name="colors" checked="checked" />
          <div class="icon" />
        </label>
      </div>
    </div>
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
        default: ''
      },
      color: {
        type: String,
        default: '#FFF'
      }
    }
  };
</script>
