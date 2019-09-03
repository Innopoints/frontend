<template>
  <div role="group" class="with-labels">
    <label v-for="(item, index) in value" :key="index" class="clickable">
      <div :class="{round, colored}" class="checkbox">
        <input
          :checked="item.checked"
          @change="changeItems(item)"
          type="checkbox"
        />
        <div :class="{white: isWhite(item)}" :style="style(item)" class="icon" />
      </div>
      {{ item.label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',
    props: {
      value: {
        type: Array,
        required: true,
      },
      round: {
        type: Boolean,
        default: false,
      },
      colored: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        data: this.value,
      };
    },
    watch: {
      value(val) {
        this.data = val;
      },
    },
    methods: {
      changeItems(item) {
        item.checked = !item.checked;
        this.$emit('change', item);
      },
      isWhite (item) {
        if(!item.color) return false;
        if (item.color.toUpperCase() === '#FFF' || item.color.toUpperCase() === '#FFFFFF') return true;
      },
      style(item) {
        if(!item.color) return '';

        if (this.isWhite(item)) return '';

        if (this.round || this.colored) {
          const color = item.color;

          // Parse HEX colors
          let outline = '';
          let match = color.toUpperCase().match(/#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/);
          if(match) {
            outline = `
            --r: ${parseInt(match[1], 16)};
            --g: ${parseInt(match[2], 16)};
            --b: ${parseInt(match[3], 16)};
          `;
          }

          return `
          background-color: ${color};
          border-color: ${color};
          ${outline}
        `;
        }
      },
    },
  };
</script>

<style scoped>
  .icon.white {
    background-color: #fff !important;
    border-color: #999 !important;
    --r: 153;
    --g: 153;
    --b: 153;
  }

  .icon.white::before {
    border-color: #999 !important;
  }
</style>

