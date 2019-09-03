<template>
  <div role="group" class="switches with-labels">
    <label
      v-for="item in items"
      :key="item.id"
      class="clickable"
    >
      <span class="label">{{ item.label }}</span>
      <div class="radio">
        <input
          :checked="selected === item"
          @change="select(item)"
          :name="name"
          type="radio"
        />
        <div class="icon" />
      </div>
    </label>
  </div>
</template>

<script>
  const items = [
    {
      id: 0,
      label: 'Push',
    },
    {
      id: 1,
      label: 'Off',
    },
    {
      id: 2,
      label: 'Email',
    },
  ];

  export default {
    name: 'ProfileRadioGroup',
    props: {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Object,
      },
    },
    data() {
      return {
        items,
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
    },
  };
</script>
