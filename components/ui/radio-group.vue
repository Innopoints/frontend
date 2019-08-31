<template>
  <div :class="{'with-labels': withLabels, horizontal}" class="radio-group" role="group">
    <label
      v-for="(item, index) in items"
      :key="index"
      :class="{clickable: withLabels, colored: !!item.color}"
      class="radio"
    >
      <input
        :checked="selected === item"
        @change="select(item)"
        :name="name"
        type="radio"
      />
      <div :class="{white: isWhite(item)}" :style="style(item)" class="icon" />
      {{ (withLabels && item.label) ? item.label : '' }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'RadioGroup',
    props: {
      name: {
        type: String,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      withLabels: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Object,
      },
      horizontal: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selected: null,
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          this.selected = value;
        },
      },
    },
    methods: {
      select(item) {
        this.selected = item;
        this.$emit('input', item);
      },
      isWhite (item) {
        if(!item.color) return false;
        if (item.color.toUpperCase() === '#FFF' || item.color.toUpperCase() === '#FFFFFF') return true;
      },
      style(item) {
        if(!item.color) return '';

        if (this.isWhite(item)) return '';

        // Parse HEX colors
        let outline = '';
        let match = item.color.toUpperCase().match(/#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/);
        if(match) {
          outline = `
            --r: ${parseInt(match[1], 16)};
            --g: ${parseInt(match[2], 16)};
            --b: ${parseInt(match[3], 16)};
          `;
        }

        return `
          background-color: ${item.color};
          border-color: ${item.color};
          ${outline}
        `;
      },
    },
  };
</script>

<style scoped>
  .radio-group .icon.white {
    background-color: #fff;
    border-color: #999;
    --r: 153;
    --g: 153;
    --b: 153;
  }

  .radio-group .icon.white::before {
    background: #999;
  }
</style>
