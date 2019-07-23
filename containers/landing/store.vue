<template>
  <section class="store container">
    <h2>How to spend innopoints?</h2>

    <div class="subtitle">
      The following items are the most popular among students.<br />
      Grab ‘em while they’re hot!
    </div>

    <div class="cards">
      <Card
        v-for="(item, i) in items"
        :key="i"
        v-bind="item"
      />
    </div>

    <div class="own-designs">
      Bright ideas for new merch are always welcome, so get in touch with us if you have some!
    </div>
  </section>
</template>

<script>
  import Card from '../../components/landing/store-card';
  import items from '../../constants/landing/store';

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
