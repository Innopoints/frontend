<template>
  <div class="material">
    <div class="align-center column">
      <nuxt-link to="/shop" class="btn">
        <img src="/images/shop/arrow-left.svg" class="mr" />
        see all products in the InnoStore
      </nuxt-link>
      <ProductCard />
      <p class="link-bottom padded">
        Lacking innopoints?
        <nuxt-link to="/events">Volunteer on events</nuxt-link> to fill in the shortage!
      </p>
    </div>
  </div>
</template>

<script>
  import items from '../../constants/shop';
  import ProductCard from '../../containers/shop/product-card';

  export default {
    head: {
      title: 'Product',
    },
    components: {
      ProductCard,
    },
    data() {
      return {
        item: items[1],
      };
    },
  };

</script>

<style lang="scss" src="../../static/css/product/index.scss" />
