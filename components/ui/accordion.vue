<template>
  <div class="accordion">
    <div :class="{open}" class="panel">
      <slot name="label">
        <Button @click="toggle" chevron>{{ label }}</Button>
      </slot>
    </div>
    <section>
      <slot />
    </section>
  </div>
</template>

<script>
  import Button from './button';
  export default {
    components: {
      Button,
    },
    props: {
      label: {
        type: String,
      },
    },
    data() {
      return {
        open: false,
      };
    },
    methods: {
      toggle() {
        return this.open = !this.open;
      },
    },
  };
</script>