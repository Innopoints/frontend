<script>
  import { createEventDispatcher } from 'svelte';
  import PeriodPicker from 'src/components/common/period-picker.svelte';
  import CompetencesChart from 'src/components/common/competences-chart.svelte';
  import datePeriods from 'src/constants/date-periods.js';

  export let statistics;
  export let competences;

  let selectedPeriod = datePeriods[2];

  function indexify(objectArray) {
    const map = new Map();
    for (const object of objectArray) {
      map.set(object.id, object.amount);
    }
    return map;
  }

  const dispatch = createEventDispatcher();
</script>

<section class="statistics">
  <div class="period">
    <span class="hide-on-less-tb">Showing statistics</span>
    <PeriodPicker
      label="Period of statistics"
      bind:value={selectedPeriod}
      on:change={({ detail }) => { dispatch('period-change', detail); }}
    />
  </div>
  <div class="simple-stats">
    <div class="stat">
      <header>
        <svg src="static/images/icons/clock.svg" class="icon" />
        {statistics.hours} volunteering hours
      </header>
      <div class="details">{statistics.positions} volunteering positions handled</div>
    </div>
    <div class="stat">
      <header>
        <svg src="static/images/icons/star.svg" class="icon" />
        Volunteer rating
        <span class="rating">{Math.round((statistics.rating + Number.EPSILON) * 100) / 100}</span>
      </header>
    </div>
  </div>
  <div class="stat competences">
    <header>
      <svg src="static/images/icons/bar-chart-2.svg" class="icon" />
      Developed competences
    </header>
    <CompetencesChart {competences} items={indexify(statistics.competences)} />
  </div>
</section>

<style src="../../../static/css/containers/profile/statistics.scss"></style>
