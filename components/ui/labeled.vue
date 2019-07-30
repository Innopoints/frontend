<template>
  <div :class="!icon && 'text'" class="labeled">
    <template v-if="icon">
      <!--eslint-disable-next-line-->
      <component :is="svg" />
      <div class="text">
        <span class="label">{{ label }}</span>
        <span>
          <slot />
        </span>
      </div>
    </template>

    <template v-else>
      <span class="label">{{ label }}</span>
      <span>
        <slot />
      </span>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Labeled',
    props: {
      icon: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        required: true,
      },
    },
    computed: {
      svg() {
        if(this.icon) return () => import('../../static' + this.icon);
        return '';
      },
    },
  };
</script>
