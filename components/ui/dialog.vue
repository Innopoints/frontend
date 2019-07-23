<template>
  <div :class="type" class="dialog">
    <button @click="$emit('close')" class="btn normal round close">
      <img src="images/ui-kit/x.svg" />
    </button>
    <span class="title">
      <img :src="icons[type]" class="icon" />
      <slot name="title">{{ title }}</slot>
    </span>
    <p>
      <slot>{{ text }}</slot>
    </p>
    <div class="actions">
      <slot name="actions">
        <button
          v-for="(action, i) in actions"
          :key="i"
          v-bind="action"
          @click="action.onclick || function() {}"
          class="btn"
        >
          {{ action.text }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      danger: {
        type: Boolean,
        default: false,
      },
      notice: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        required: false,
      },
      text: {
        type: String,
        required: false,
      },
      actions: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        icons: {
          '': '/images/ui-kit/award.svg',
          danger: '/images/ui-kit/alert-triangle.svg',
          notice: '/images/ui-kit/alert-triangle-green.svg',
        },
      };
    },
    computed: {
      type() {
        if(this.danger)
          return 'danger';
        if(this.notice)
          return 'notice';
        return '';
      },
    },
  };
</script>
