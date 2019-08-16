<template>
  <div class="filters">
    <!--<div :class="mobileCollapsed && 'filters-collapsed'" class="ellipse">
      <Search />
      <Spots />
      <Competences />
      <DateRange />

      <div @click="toggleMobileCollapsed" class="show-filters no-border">
        <img
          src="/images/projects/filter.svg"
          srcset="/images/projects/filter-mobile.svg 18w, /images/projects/filter.svg 24w"
          sizes="(min-width: 640px) 24px, 20px"
        />
        <span>filters</span>
      </div>
    </div>-->
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  // import Competences from '../../components/projects/filters/competences';
  // import DateRange from '../../components/projects/filters/date-range';
  // import Search from '../../components/projects/filters/search';
  // import Spots from '../../components/projects/filters/spots';

  export default {
    name: 'Filters',
    components: {
      // Search,
      // DateRange,
      // Competences,
      // Spots
    },
    computed: {
      ...mapState({
        mobileCollapsed: state => state.projects.mobileCollapsed,
      }),
    },
    methods: {
      ...mapActions({
        toggleMobileCollapsed: 'projects/toggleMobileCollapsed',
      }),
    },
  };
</script>
