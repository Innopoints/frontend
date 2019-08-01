<template>
  <div class="material">
    <div class="align-center column">
      <a href="/shop" class="btn">
        <img src="images/shop/arrow-left.svg" class="mr" />
        see all products in the InnoStore
      </a>
      <ProductCard />
      <p class="link-bottom padded">
        Lacking innopoints?
        <a href="events.html">Volunteer on events</a> to fill in the shortage!
      </p>
    </div>
  </div>
</template>

<script>
  import items from '../constants/store';
  import ProductCard from '../containers/shop/product-card';

  export default {

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

<style lang="scss" src="../static/css/view-product/index.scss" />
