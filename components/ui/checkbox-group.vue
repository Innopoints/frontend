<template>
  <div role="group" class="with-labels">
    <label v-for="(item, index) in data" :key="index" class="clickable">
      <div :class="{round, colored}" class="checkbox">
        <input
          :checked="item.checked"
          @change="$emit('change', item)"
          type="checkbox"
        />
        <div :style="style(item)" class="icon" />
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
    methods: {
      changeItems(index) {
        this.data[index] = !this.data[index];
      },
      style(item) {
        let color = item.color;
        if(!color) color = '#387800';

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
      },
    },
  };
</script>
