<template>
  <div id="store" class="material">
    <ShopTagline />
    <section class="shop padded">
      <div class="cards">
        <Card
          v-for="(item, i) in items"
          :key="i"
          v-bind="item"
          priced
        />
      </div>
    </section>
    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The <nuxt-link to="/shop">InnoStore</nuxt-link> has your answers!
    </p>
  </div>
</template>

<script>
  import Card from '../components/landing/store-card';
  import ShopTagline from '../components/shop/tagline';
  import items from '../constants/shop/store';

  export default {
    components: {
      Card,
      ShopTagline
    },
    data() {
      return {
        items,
      };
    },
  };
</script>

<style lang="scss" src="../static/css/shop/index.scss" />

