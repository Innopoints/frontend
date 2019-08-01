<template>
  <div class="balance-tooltip">
    You have 1337
    <Innopoint class="ml" />
  </div>
</template>

<script>
  import Innopoint from '../../static/images/innopoint.svg';
  export default {
    name: 'BalanceTooltip',
    components: {
      Innopoint,
    },
  };
</script>
