<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import PeriodPicker from '@/components/common/period-picker.svelte';
  import CompetencesChart from '@/components/profile/competences-chart.svelte';
  import datePeriods from '@/constants/date-periods.js';

  export let statistics;
  export let competences;

  let selectedPeriod = datePeriods[2];

  const dispatch = createEventDispatcher();

  function indexify(objectArray) {
    const map = new Map();
    for (let object of objectArray) {
      map.set(object.id, object.amount);
    }
    return map;
  }
</script>

<section class="statistics">
  <div class="period">
    <span class="hide-tb">Showing statistics</span>
    <PeriodPicker
      label="Period of statistics"
      on:period-change={(e) => { selectedPeriod = e.detail; dispatch('period-change', e.detail); }}
    />
    {#if false}
      <Button on:click={() => dispatch('create-report', selectedPeriod)}>
        <svg src="images/icons/file-text.svg" class="mr" />
        create a volunteer report
      </Button>
    {/if}
  </div>
  <div class="top-stats">
    <div class="stat">
      <header>
        <svg src="images/icons/clock.svg" class="icon" />
        {statistics.hours} volunteering hours
      </header>
      <div class="details">{statistics.positions} volunteering positions handled</div>
    </div>
    <div class="stat">
      <header>
        <svg src="images/icons/star.svg" class="icon" />
        Volunteer rating
        <span class="rating">{statistics.rating}</span>
      </header>
    </div>
  </div>
  <div class="stat competences">
    <header>
      <svg src="images/icons/bar-chart-2.svg" class="icon" />
      Developed competences
    </header>
    <CompetencesChart {competences} items={indexify(statistics.competences)} />
  </div>
</section>
