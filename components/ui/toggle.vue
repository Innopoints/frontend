<template>
  <label class="clickable">
    {{ label }}

    <input
      :checked="checked"
      :name="name"
      @change="click"
      class="switch-ctl"
      type="checkbox"
    />

    <div class="switch">
      <div class="knob" />
    </div>
  </label>
</template>

<script>
  export default {
    name: 'Toggle',
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
      name: {
        type: String,
        default: ''
      },
    }
  };
</script>
