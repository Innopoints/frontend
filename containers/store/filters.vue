<template>
  <div class="filters">
    <TextField
      v-model="search"
      placeholder="Type to search"
      item="img"
      src="/images/icons/search.svg"
    />

    <Dropdown
      :chevron="false"
      right
    >
      <template v-slot:label>
        <FilterIcon class="mr" />
        filters
        <span class="dot active small" />
      </template>
      <Button @click="$store.dispatch('store/clearFilters')" danger>clear filters</Button>
      <ul class="accordion">
        <Price />
        <Colors />
      </ul>
    </Dropdown>
  </div>
</template>

<script>
  import TextField from '@/components/ui/text-field';
  import Dropdown from '@/components/ui/dropdown';
  import Button from '@/components/ui/button';
  import FilterIcon from '@/static/images/icons/filter.svg';
  import Price from '@/components/store/filters/price';
  import Colors from '@/components/store/filters/colors';

  export default {
    name: 'Filters',
    components: {
      TextField,
      Dropdown,
      Button,
      FilterIcon,
      Price,
      Colors,
    },
    data() {
      return {
      };
    },
    computed: {
      search: {
        get() {
          return this.$store.state.store.filters.search;
        },
        set(value) {
          return this.$store.commit('store/changeFilter', {type: 'search', value});
        },
      },
    },
    methods: {
    },
  };
</script>
