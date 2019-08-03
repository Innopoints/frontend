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
      <div :style="style(item)" class="icon" />
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
      style(item) {
        if(!item.color) return '';

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

<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &.horizontal {
    flex-direction: row;
  }
  >.radio {
    padding: 5px;
  }
}
</style>
