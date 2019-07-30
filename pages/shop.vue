<template>
  <section class="shop padded">
    <div class="cards">
      <Card
        v-for="(item, i) in items"
        :key="i"
        v-bind="item"
        withPrice
      />
    </div>
  </section>
</template>

<script>
  import Card from '../components/landing/store-card';
  import items from '../constants/landing/store';

  export default {
    components: {
      Card,
    },
    data() {
      return {
        items,
      };
    },
  };
</script>

<style lang="scss" src="../static/css/landing/index.scss">

</style>

