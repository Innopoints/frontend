<template>
  <label :class="[label ? 'clickable' : '']">
    <div class="checkbox">
      <input
        :checked="checked"
        :name="name"
        @change="click"
        type="checkbox"
      />
      <div class="icon" />
    </div>
    {{ label }}
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      checked: {
        type: Boolean,
        required: true
      },
      click: {
        type: Function,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      name: String,
    },
  };
</script>
