<template>
  <div class="filters">
    <TextField
      v-model="search"
      placeholder="Type to search"
      item="img"
      src="/images/icons/search.svg"
    />

    <div class="dropdowns">
      <Dropdown
        :chevron="false"
        class="order-options"
      >
        <template v-slot:label>
          <OrderIcon class="mr" />
          {{ orderBy || 'order' }}
        </template>
        <RadioGroup
          v-model="ordering"
          :items="orderings"
          :with-labels="true"
          name="ordering"
        />
      </Dropdown>
      <Dropdown
        :chevron="false"
        right
      >
        <template v-slot:label>
          <FilterIcon class="mr" />
          filters
          <span class="dot active small" />
        </template>
        <Button @click="$store.dispatch('projects/clearFilters')" danger>clear filters</Button>
        <FiltersAccordion />
      </Dropdown>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import RadioGroup from '@/components/ui/radio-group';
  import TextField from '@/components/ui/text-field';
  import Dropdown from '@/components/ui/dropdown';
  import Button from '@/components/ui/button';
  import FilterIcon from '@/static/images/icons/filter.svg';
  import OrderIcon from '@/static/images/icons/order.svg';
  import FiltersAccordion from '@/containers/projects/filters-accordion';

  export default {
    name: 'Filters',
    components: {
      FiltersAccordion,
      RadioGroup,
      TextField,
      Dropdown,
      Button,
      FilterIcon,
      OrderIcon,
    },
    data() {
      return {
        orderings: [
          'most recent',
          'least recent',
          'most valuable',
          'least valuable',
        ].map(label => ({label, value: label})),
      };
    },
    computed: {
      ...mapState('projects', ['filters', 'orderBy']),
      search: {
        get() {
          return this.filters.search;
        },
        set(value) {
          return this.$store.commit('projects/changeFilter', {type: 'search', value});
        },
      },
      ordering: {
        get() {
          return {label: this.orderBy, value: this.orderBy};
        },
        set(option) {
          this.$store.commit('projects/changeField', {type: 'orderBy', value: option.value});
        },
      },
    },
  };
</script>
