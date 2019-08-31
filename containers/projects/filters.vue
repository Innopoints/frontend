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
      <Button @click="$store.dispatch('projects/clearFilters')" danger>clear filters</Button>
      <FiltersAccordion />
    </Dropdown>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TextField from '@/components/ui/text-field';
  import Dropdown from '@/components/ui/dropdown';
  import Button from '@/components/ui/button';
  import FilterIcon from '@/static/images/icons/filter.svg';
  import FiltersAccordion from '@/containers/projects/filters-accordion';

  export default {
    name: 'Filters',
    components: {
      FiltersAccordion,
      TextField,
      Dropdown,
      Button,
      FilterIcon,
    },
    computed: {
      ...mapState('projects', ['filters']),
      search: {
        get() {
          return this.filters.search;
        },
        set(value) {
          return this.$store.commit('projects/changeFilter', {type: 'search', value});
        },
      },
    },
  };
</script>
