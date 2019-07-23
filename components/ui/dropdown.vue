<template>
  <div :class="isOpen && 'open'" class="dropdown-shell">
    <button
      @click="toggle"
      v-ripple="'rgba(56, 120, 0, .25)'"
      type="button"
      class="btn handle"
    >
      <slot name="opener" />
      <img v-if="chevron" src="/images/events/chevron-down.svg" class="chevron" />
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
      chevron: {
        type: Boolean,
        default: true
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
