<template>
  <div role="group" class="with-labels">
    <label v-for="(item, index) in data" :key="index" class="clickable">
      <div class="checkbox">
        <input
          :checked="item.checked"
          @change="$emit('change', item)"
          type="checkbox"
        />
        <div class="icon" />
      </div>
      {{ item.label }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',
    props: {
      items: {
        type: Array,
        required: true,
      },
      click: {
        type: Function,
        // required: true,
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
    },
  };
</script>
