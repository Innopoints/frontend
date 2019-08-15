<template>
  <div class="material">
    <ShopTagline />
    <section class="shop padded">
      <div class="cards">
        <StoreCard
          v-for="item in items"
          :key="item.id"
          v-bind="item"
          :toggle-modal="toggleModal"
        />
      </div>
    </section>
    <p class="link-bottom padded">
      Lacking innopoints?
      <nuxt-link to="/events">Volunteer on events</nuxt-link> to fill in the shortage!
    </p>

    <ProductModal
      v-if="open"
      :open="open"
      :toggle-modal="toggleModal"
      :product="product"
    />
  </div>
</template>

<script>
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
        open: false,
        product: null,
      };
    },
    watch: {
      $route() {
        if(this.$route.query.id) this.product = items.find(x => x.id === parseInt(this.$route.query.id));
      },
    },
    asyncData ({ query, redirect }) {
      if(query.id) redirect('/shop/' + query.id);
    },
    methods: {
      toggleModal() {
        this.open = !this.open;
      },
    },
  };
</script>

<style lang="scss" src="../../static/css/store/index.scss" />

