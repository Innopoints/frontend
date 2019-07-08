<template>
  <div class="container filters">
    <div class="ellipse filters-collapsed">
      <Search />
      <Spots />
      <Competences />
      <DateRange />

      <div class="show-filters no-border">
        <img
          src="/images/events/filter.svg"
          srcset="/images/events/filter-mobile.svg 18w, /images/events/filter.svg 24w"
          sizes="(min-width: 640px) 24px, 20px"
        />
        <span>filters</span>
      </div>
    </div>

    <Ordering />
  </div>
</template>

<script>
  import Competences from '../../components/events/filters/competences';
  import DateRange from '../../components/events/filters/date-range';
  import Ordering from '../../components/events/filters/ordering';
  import Search from '../../components/events/filters/search';
  import Spots from '../../components/events/filters/spots';

  export default {
    name: 'Filters',
    components: {
      Search,
      Ordering,
      DateRange,
      Competences,
      Spots
    }
  };
</script>
