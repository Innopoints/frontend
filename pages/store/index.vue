<template>
  <div :class="{'modal-open': open}">
    <div class="material">
      <StoreTagline />
      <section id="store-top" class="shop padded">
        <Filters />
        <Ordering />

        <div class="cards">
          <StoreCard
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            :toggle-modal="toggleModal"
          />
        </div>

        <Pagination v-model="currentPage" :pageCount="pageCount" />
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
  import Ordering from '@/components/store/filters/ordering';
  import Pagination from '@/components/pagination';

  export default {
    head: {
      title: 'InnoStore',
    },
    components: {
      StoreCard,
      StoreTagline,
      Filters,
      Ordering,
      ProductModal: () => import('../../containers/store/product-modal'),
      Pagination,
    },
    data() {
      return {
        open: false,
        product: null,
        currentPage: 1,
        itemsPerPage: 20,
      };
    },
    computed: {
      products() {
        return this.$store.getters['store/products'];
      },
      pageCount() {
        return Math.ceil(this.products.length / this.itemsPerPage);
      },
      items() {
        const begin = this.itemsPerPage * (this.currentPage - 1);
        const end = begin + this.itemsPerPage;
        return this.products.slice(begin, end);
      },
    },
    watch: {
      $route() {
        if(this.$route.query.id) {
          this.product = this.items.find(x => x.id === parseInt(this.$route.query.id));
          if(this.product !== undefined)
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

