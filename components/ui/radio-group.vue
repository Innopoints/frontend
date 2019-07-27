<template>
  <div :class="withLabels && 'with-labels'" role="group">
    <label
      v-for="(item, index) in data"
      :key="index"
      :class="withLabels && 'clickable'"
      class="radio"
    >
      <div class="radio">
        <input
          :checked="item.checked"
          @change="changeItems(index)"
          :name="name"
          type="radio"
        />
        <div :style="style(item)" class="icon" />
      </div>
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
      click: {
        type: Function,
        required: true,
      },
      withLabels: {
        type: Boolean,
        default: false,
      },
      withColors: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        data: this.items,
      };
    },
    methods: {
      changeItems(index) {
        this.data[index] = !this.data[index];
        this.click(this.data);
      },
      style(item) {
        if(this.withColors) {
          return `
          background-color: ${item.color};
          border-color: ${item.color};
        `;
        }
        return '';
      },
    },
  };
</script>
