<template>
  <section class="store container">
    <h2>How to spend innopoints?</h2>

    <div class="subtitle">
      The following items are the most popular among students.<br />
      Grab ‘em while they’re hot!
    </div>

    <div class="cards">
      <StoreCard
        v-for="item in items.slice(0, 3)"
        :key="item.id"
        v-bind="item"
        is-short
      />
    </div>

    <div class="own-designs">
      Bright ideas for new merch are always welcome, so get in touch with us if you have some!
    </div>
  </section>
</template>

<script>
  import StoreCard from '../../components/shop/card';
  import items from '../../constants/store';

  export default {
    components: {
      StoreCard,
    },
    data() {
      return {
        items,
      };
    },
  };
</script>
