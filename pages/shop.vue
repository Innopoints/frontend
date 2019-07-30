<template>
  <div id="store" class="material">
    <ShopTagline />
    <section class="shop padded">
      <div class="cards">
        <StoreCard
          v-for="(item, i) in items"
          :key="i"
          v-bind="item"
          priced
        />
      </div>
    </section>
    <p class="link-bottom padded">
      Lacking innopoints? <nuxt-link to="/events">Volunteer on events</nuxt-link> to fill in the shortage!
    </p>
  </div>
</template>

<script>
  import StoreCard from '../components/landing/store-card';
  import ShopTagline from '../components/shop/tagline';
  import items from '../constants/shop/store';

  export default {
    head: {
      title: "InnoStore",
    },
    components: {
      StoreCard,
      ShopTagline,
    },
    data() {
      return {
        items,
      };
    },
  };
</script>

<style lang="scss" src="../static/css/shop/index.scss" />

