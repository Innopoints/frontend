<template>
  <div>
    <div id="store" class="material">
      <ShopTagline />
      <section class="shop padded">
        <div class="cards">
          <StoreCard v-for="item in items" :key="item.id" v-bind="item" />
        </div>
      </section>
      <p class="link-bottom padded">
        Lacking innopoints?
        <nuxt-link to="/events">Volunteer on events</nuxt-link> to fill in the shortage!
      </p>
    </div>
    <ProductCard
      id="view-product"
      class="modal-overlay column modal-open radio-group"
    />
  </div>
</template>

<script>
  import StoreCard from "../components/shop/card";
  import ShopTagline from "../components/shop/tagline";
  import ProductCard from "../containers/shop/product-card";
  import items from "../constants/store";

  export default {
    head: {
      title: "InnoStore",
    },
    components: {
      StoreCard,
      ShopTagline,
      ProductCard,
    },
    data() {
      return {
        items,
      };
    },
  };
</script>

<style lang="scss" src="../static/css/shop/index.scss" />

