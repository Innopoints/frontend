<template>
  <div class="balance-tooltip">
    You have {{ balance }}
    <Innopoint class="ml" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Innopoint from '../../static/images/innopoint-sharp.svg';

  export default {
    name: 'BalanceTooltip',
    components: {
      Innopoint,
    },
    computed: {
      ...mapState({
        balance: state => state.user.balance,
      }),
    },
  };
</script>
