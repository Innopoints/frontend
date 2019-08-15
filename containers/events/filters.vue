<template>
  <div class="filters">
    <TextField
      v-model="search"
      placeholder="Type to search"
      item="img"
      src="/images/events/search.svg"
    />

    <Dropdown
      :chevron="false"
      right
    >
      <template v-slot:label>
        <img
          src="/images/events/filter.svg"
          srcset="/images/events/filter-mobile.svg 18w, /images/events/filter.svg 24w"
          sizes="(min-width: 640px) 24px, 20px"
        />
        filters
        <span class="dot active small" />
      </template>
      <Button danger>clear filters</Button>
      <ul class="accordion">
        <Spots />
        <!-- <Competences /> -->
        <!-- <DateRange /> -->
      </ul>
    </Dropdown>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Competences from '@/components/events/filters/competences';
  // import DateRange from '@/components/events/filters/date-range';
  import Spots from '@/components/events/filters/spots';
  import TextField from '@/components/ui/text-field';
  import Dropdown from '@/components/ui/dropdown';
  import Button from '@/components/ui/button';

  export default {
    name: 'Filters',
    components: {
      // DateRange,
      Competences,
      Spots,
      TextField,
      Dropdown,
      Button,
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapState('events', ['filters']),
      search: {
        get() {
          return this.filters.search;
        },
        set(value) {
          return this.$store.commit('events/changeFilter', {type: 'search', value});
        },
      },
    },
    methods: {
    },
  };
</script>
