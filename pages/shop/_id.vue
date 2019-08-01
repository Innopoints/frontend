<template>
  <div class="material">
    <div class="align-center column">
      <Button
        link
        href="/shop"
        img="/images/shop/arrow-left.svg"
        label="see all products in the InnoStore"
      />

      <BalanceTooltip />
      <ProductCard v-bind="product" />

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
  import Button from '../../components/ui/button';
  import BalanceTooltip from '../../containers/shop/balance';

  export default {
    head: {
      title: 'Product',
    },
    components: {
      BalanceTooltip,
      Button,
      ProductCard,
    },
    asyncData ({ params }) {
      return {
        product: items.find(x => x.id === parseInt(params.id)),
      };
    },
  };

</script>

<style lang="scss" src="../../static/css/product/index.scss" />
