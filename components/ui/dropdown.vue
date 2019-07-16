<template>
  <div :class="isOpen && 'open'" class="dropdown-shell">
    <button @click="toggle" class="btn handle">
      {{ label }}
      <img src="/images/events/chevron-down.svg" class="chevron" />
    </button>
    <div :class="right && 'right-edge'" class="dropdown">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    props: {
      open: {
        type: Boolean,
        default: false
      },
      right: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isOpen: this.open
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      }
    }
  };
</script>
