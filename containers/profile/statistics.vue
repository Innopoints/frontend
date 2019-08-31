<template>
  <section class="statistics">
    <div class="period">
      <span class="hide-tb">Showing statistics</span>
      <Dropdown>
        <template v-slot:label>
          {{ activePeriod.label }}
        </template>
        <span class="label">Period of statistics</span>
        <ul class="mt">
          <li
            v-for="period in periods"
            :key="period.id"
          >
            <Button :label="period.label" @click="changePeriod(period)" />
          </li>
        </ul>
        <hr data-text="or" />
        <Button label="select date range" img="/images/icons/calendar.svg" />
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

  export default {
    name: 'ProfileStatistics',
    components: {
      CompetencesStats,
      TopStats,
      Button,
      Dropdown,
    },
    data() {
      return {
        periods,
        activePeriod: periods[0],
      };
    },
    methods: {
      changePeriod(period) {
        this.activePeriod = period;
      },
    },
  };
</script>

<style>
  .statistics {
    display: block !important;
  }
</style>
