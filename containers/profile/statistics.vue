<template>
  <section class="statistics">
    <div class="period">
      <span class="hide-tb">Showing statistics</span>
      <Dropdown>
        <template v-slot:label>
          {{ activePeriod.label.indexOf('last') !== -1 ? 'over the ' : 'for ' }}{{ activePeriod.label }}
        </template>
        <span class="label">Period of statistics</span>
        <ul v-if="!dateRange" class="mt">
          <li
            v-for="period in periods"
            :key="period.id"
          >
            <Button :label="period.label" @click="changePeriod(period)" />
          </li>
        </ul>
        <hr v-if="!dateRange" data-text="or" />
        <Button
          @click="toggleDateRange"
          :label="dateRange ? 'back to time periods' : 'select date range'"
          :img="dateRange ? '/images/icons/arrow-left.svg' : '/images/icons/calendar.svg'"
          class="mt"
        />
        <DateRange v-if="dateRange" />
      </Dropdown>
    </div>

    <Button img="/images/icons/file-text.svg" label="create a volunteer report" />

    <TopStats />

    <CompetencesStats />
  </section>
</template>

<script>
  import Dropdown from '../../components/ui/dropdown';
  import Button from '../../components/ui/button';
  import TopStats from '@/components/profile/top-stats';
  import CompetencesStats from '@/components/profile/competences-stats';
  import periods from '@/constants/profile/stats-period';
  import DateRange from '@/components/projects/filters/date-range';

  export default {
    name: 'ProfileStatistics',
    components: {
      DateRange,
      CompetencesStats,
      TopStats,
      Button,
      Dropdown,
    },
    data() {
      return {
        periods,
        activePeriod: periods[0],
        dateRange: false,
      };
    },
    methods: {
      changePeriod(period) {
        this.activePeriod = period;
      },
      toggleDateRange() {
        this.dateRange = !this.dateRange;
      },
    },
  };
</script>

<style>
  .statistics {
    display: block !important;
  }
</style>
