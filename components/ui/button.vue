<template>
  <!--eslint-disable-next-line-->
  <component
    v-bind:is="link ? 'a' : 'button'"
    :class="['btn', filled && 'filled', outline && 'outline', danger && 'danger', round && 'round', normal && 'normal']"
    :href="link && href"
    :disabled="!link && disabled"
    v-ripple="ripple"
    @click="handleClick"
  >
    <template v-if="badge">
      <div class="badge">
        <!--eslint-disable-next-line-->
        <component v-if="img" :is="svg" :class="[label && 'mr']" />
      </div>
    </template>

    <template v-else-if="img">
      <!--eslint-disable-next-line-->
      <component v-if="img" :is="svg" :class="[label && 'mr']" />
    </template>

    {{ label }}
  </component>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      label: {
        type: String,
        default: ''
      },
      link: {
        type: Boolean,
        default: false
      },
      href: {
        type: String,
        default: '#'
      },
      img: {
        type: String,
        default: ''
      },
      click: Function,
      filled: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: false
      },
      danger: {
        type: Boolean,
        default: false
      },
      badge: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      normal: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      svg() {
        if(this.img) return () => import('../../static' + this.img);
        return '';
      },
      ripple() {
        if(this.filled) {
          return 'rgba(255, 255, 255, .35)';
        } else if(this.danger) {
          return 'rgba(186, 3, 3, .25)';
        } else {
          return 'rgba(56, 120, 0, .25)';
        }
      }
    },
    methods: {
      handleClick() {
        if(!this.link && this.click) this.click();
      }
    }
  };
</script>
