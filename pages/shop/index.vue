<template>
  <div class="material">
    <ShopTagline />
    <section class="shop padded">
      <div class="cards">
        <StoreCard
          v-for="item in items"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </section>
    <p class="link-bottom padded">
      Lacking innopoints?
      <nuxt-link to="/events">Volunteer on events</nuxt-link> to fill in the shortage!
    </p>

    <ProductModal v-if="open" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import StoreCard from "../../components/shop/card";
  import ShopTagline from "../../components/shop/tagline";
  import items from "../../constants/shop";

  export default {
    head: {
      title: 'Shop',
    },
    components: {
      StoreCard,
      ShopTagline,
      ProductModal: () => import('../../containers/shop/product-modal'),
    },
    data() {
      return {
        items,
      };
    },
    computed: {
      ...mapState({
        open: state => state.product.open
      }),
    },
  };
</script>

<style lang="scss" src="../../static/css/shop/index.scss" />

