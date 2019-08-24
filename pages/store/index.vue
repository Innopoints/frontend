<template>
  <div :class="{'modal-open': open}">
    <div class="material">
      <StoreTagline />
      <section class="shop padded">
        <Filters />
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
        <nuxt-link to="/projects">Volunteer on projects</nuxt-link> to fill in the shortage!
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
  import Filters from '@/containers/store/filters';

  export default {
    head: {
      title: 'InnoStore',
    },
    components: {
      StoreCard,
      StoreTagline,
      Filters,
      ProductModal: () => import('../../containers/store/product-modal'),
    },
    data() {
      return {
        open: false,
        product: null,
      };
    },
    computed: {
      items() {
        return this.$store.getters['store/products'];
      },
    },
    watch: {
      $route() {
        if(this.$route.query.id) {
          this.product = this.items.find(x => x.id === parseInt(this.$route.query.id));
          if(this.product != undefined)
            this.open = true;
        }
        else {
          this.open = false;
        }
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

