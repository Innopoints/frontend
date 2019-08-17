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
      <ul class="accordion">
        <Spots />
        <Competences />
        <DateRange />
      </ul>
    </Dropdown>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Competences from '@/components/projects/filters/competences';
  import DateRange from '@/components/projects/filters/date-range';
  import Spots from '@/components/projects/filters/spots';
  import TextField from '@/components/ui/text-field';
  import Dropdown from '@/components/ui/dropdown';
  import Button from '@/components/ui/button';
  import FilterIcon from '@/static/images/icons/filter.svg';

  export default {
    name: 'Filters',
    components: {
      DateRange,
      Competences,
      Spots,
      TextField,
      Dropdown,
      Button,
      FilterIcon,
    },
    data() {
      return {
      };
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
    methods: {
    },
  };
</script>
