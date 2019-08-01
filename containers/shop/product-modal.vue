<template>
  <div :class="{'modal-open': open}" class="modal-overlay column">
    <BalanceTooltip />
    <ProductCard v-bind="product" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BalanceTooltip from './balance';
  import ProductCard from './product-card';

  export default {
    name: 'ProductModal',
    components: {
      ProductCard,
      BalanceTooltip,
    },
    props: {
      id: Number,
    },
    computed: {
      ...mapState({
        open: state => state.product.open,
        product: state => state.product.product,
      }),
    },
  };
</script>
