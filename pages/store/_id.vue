<template>
  <div class="material">
    <div class="align-center column">
      <Button
        link
        href="/store"
        img="/images/icons/arrow-left.svg"
        label="see all products in the InnoStore"
      />

      <BalanceTooltip />
      <ProductCard v-bind="product" />

      <p class="link-bottom padded">
        Lacking innopoints?
        <nuxt-link to="/projects">Volunteer on events</nuxt-link> to fill in the shortage!
      </p>
    </div>
  </div>
</template>

<script>
  import items from '../../constants/store';
  import ProductCard from '../../containers/store/product-card';
  import Button from '../../components/ui/button';
  import BalanceTooltip from '../../containers/store/balance';

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
