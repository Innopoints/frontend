<template>
  <div :class="{'modal-open': open}" class="modal-overlay column">
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
      open: Boolean,
      toggleModal: Function,
    },
  };
</script>
