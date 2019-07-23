<template>
  <span :class="classes" />
</template>

<script>
  export default {
    name: 'Dot',
    props: {
      small: Boolean,
      attention: Boolean,
      active: Boolean
    },
    computed: {
      classes() {
        let arr = ['dot'];
        if(this.small) arr.push('small');
        if(this.attention) {
          arr.push('attention');
        } else if(this.active) {
          arr.push('active');
        } else {
          arr.push('new');
        }
        return arr;
      }
    }
  };
</script>

<style scoped>
  .dot {
    display: inline-block;
  }
</style>
