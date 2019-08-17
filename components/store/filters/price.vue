<template>
  <li class="filter price">
    <div>
      <span class="name">price</span>
      <div class="align-center">
        <TextField
          :value="minPrice"
          :min="0"
          @change="$store.commit('store/changeFilter', {type: 'minPrice', value: $event})"
          type="number"
        />
        <span class="ml mr">–</span>
        <TextField
          :value="maxPrice"
          :min="0"
          @change="$store.commit('store/changeFilter', {type: 'maxPrice', value: $event})"
          type="number"
        />
      </div>
    </div>
    <Button v-if="$store.state.user.isAuth" @click="showAffordable" class="mt">
      <LabelIcon />
      show affordable
    </Button>
  </li>
</template>

<script>
  import TextField from '@/components/ui/text-field';
  import Button from '@/components/ui/button';
  import LabelIcon from '@/static/images/icons/label.svg';
  import { mapState } from 'vuex';

  export default {
    components: {
      TextField,
      Button,
      LabelIcon,
    },
    computed: {
      ...mapState('store', {
        minPrice: state => state.filters.minPrice,
        maxPrice: state => state.filters.maxPrice,
      }),
    },
    methods: {
      showAffordable() {
        const myPoints = this.$store.state.user.balance;
        this.$store.commit('store/changeFilter', {type: 'minPrice', value: 0});
        this.$store.commit('store/changeFilter', {type: 'maxPrice', value: myPoints});
      },
    },
  };
</script>