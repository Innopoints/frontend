<template>
  <div class="ordering hide-mb">
    <Chip
      v-for="(option, i) in options"
      :key="i"
      :text="option + ' first'"
      :value="selected === option"
      @input="select(option)"
      name="ordering"
    />
  </div>
</template>

<script>
  import Chip from '@/components/ui/chip';

  export default {
    name: 'Ordering',
    components: {
      Chip,
    },
    data() {
      return {
        options: [
          'cheapest',
          'most expensive',
          'most popular',
          'least popular',
        ],
        selected: '',
      };
    },
    methods: {
      select(option) {
        this.selected = option;
        this.$store.commit('store/changeField', {type: 'orderBy', value: option});
      },
    },
  };
</script>
