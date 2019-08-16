<template>
  <div class="modal-overlay column">
    <BalanceTooltip />
    <ProductCard v-bind="product" :toggleModal="toggleModal" closable />
  </div>
</template>

<script>
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
      product: Object,
      toggleModal: Function,
    },
  };
</script>
