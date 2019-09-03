<template>
  <label class="clickable switch-wrapper">
    {{ !twoState ? label : '' }}

    <input
      :checked="checked"
      :name="name"
      @change="$emit('click', $event)"
      :class="twoState && 'first'"
      class="switch-ctl"
      type="checkbox"
    />

    <span v-if="twoState" class="state first">{{ first }}</span>
    <div :class="twoState ? 'two-state' : 'ml-2'" class="switch">
      <div class="knob" />
    </div>
    <span v-if="twoState" class="state second">{{ second }}</span>
  </label>
</template>

<script>
  export default {
    name: 'Toggle',
    props: {
      checked: {
        type: Boolean,
        required: true,
      },
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      twoState: {
        type: Boolean,
        default: false,
      },
      first: String,
      second: String,
    },
  };
</script>
