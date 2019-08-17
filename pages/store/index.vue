<template>
  <div :class="{'modal-open': open}">
    <div class="material">
      <StoreTagline />
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
        <nuxt-link to="/projects">Volunteer on events</nuxt-link> to fill in the shortage!
      </p>
    </div>
    <ProductModal
      v-if="open"
      :product="product"
    />
  </div>
</template>

<script>
  import StoreCard from "../../components/store/card";
  import StoreTagline from "../../components/store/tagline";
  import items from "../../constants/store";

  export default {
    head: {
      title: 'InnoStore',
    },
    components: {
      StoreCard,
      StoreTagline,
      ProductModal: () => import('../../containers/store/product-modal'),
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
      if(query.id) redirect('/store/' + query.id);
    },
    methods: {
      toggleModal() {
        this.open = !this.open;
      },
    },
  };
</script>

<style lang="scss" src="../../static/css/store/index.scss" />

