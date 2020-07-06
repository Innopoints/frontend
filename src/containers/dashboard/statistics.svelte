<script>
  import { Card, Loading, Divider } from 'attractions';
  import { s } from 'attractions/utils';
  import PeriodPicker from 'src/components/common/period-picker.svelte';
  import UserGroupPicker from 'src/components/common/user-group-picker.svelte';
  import ProjectTagPicker from 'src/components/common/project-tag-picker.svelte';
  import CompetencesChart from 'src/components/common/competences-chart.svelte';
  import datePeriods from 'src/constants/date-periods.js';
  import * as api from 'src/utils/api.js';
  import arraysEqual from 'src/utils/arrays-equal.js';

  export let groups;
  export let competences;
  export let tags;

  let selectedPeriod = datePeriods[2];
  let selectedGroups = [];
  let selectedTag = null;
  const now = new Date();
  let statistics = null;
  let hours = null;
  let innopoints = null;

  $: fetchStatistics(selectedPeriod, selectedGroups, selectedTag);

  let lastParameters = null;
  function fetchStatistics(selectedPeriod, selectedGroups, selectedTag) {
    if (typeof window === 'undefined') {
      return;
    }

    const query = new Map([
      ['start_date', selectedPeriod.getStart(now)],
      ['end_date', now],
      ['group', selectedGroups],
    ]);
    if (selectedTag != null) {
      query.set('tag', selectedTag);
    }

    if (lastParameters != null
        && lastParameters.get('start_date').valueOf() === query.get('start_date').valueOf()
        && lastParameters.get('end_date').valueOf() === query.get('end_date').valueOf()
        && arraysEqual(lastParameters.get('group'), query.get('group'))
        && lastParameters.get('tag') === query.get('tag')) {
      return;
    }

    lastParameters = query;
    statistics = api.json(api.get('/statistics/competences', { query })).then(indexify);
    hours = api.json(api.get('/statistics/hours', { query }));
    innopoints = api.json(api.get('/statistics/innopoints', { query }));
  }

  function indexify(objectArray) {
    const map = new Map();
    if (objectArray != null) {
      for (const object of objectArray) {
        map.set(object.id, object.amount);
      }
    }
    return map;
  }
</script>

<div class="statistics">
  <Card>
    <div class="title">
      <svg src="static/images/icons/bar-chart-2.svg" class="icon" />
      Statistics
    </div>
    <div class="controls">
      <PeriodPicker label="Period of statistics" bind:value={selectedPeriod} />
      <UserGroupPicker {groups} bind:value={selectedGroups} name="competence-groups" />
      <ProjectTagPicker {tags} bind:value={selectedTag} name="competence-tags" />
    </div>
    <Divider />
    {#if statistics == null || hours == null || innopoints == null}
      <div class="loader">
        <Loading class="mr-2" />
        Loading...
      </div>
    {:else}
      {#await Promise.all([statistics, hours, innopoints])}
        <div class="loader">
          <Loading class="mr-2" />
          Loading...
        </div>
      {:then [statisticsR, hoursR, innopointsR]}
        <div class="text-row">
          {hoursR} hour{s(hoursR)} spent volunteering
        </div>
        <div class="text-row">
          {innopointsR} innopoint{s(innopointsR)} spent
        </div>
        <CompetencesChart {competences} items={statisticsR} />
      {:catch}
        <div class="loader">
          <svg src="static/images/icons/x.svg" class="mr-2" />
          Failed to get statistics
        </div>
      {/await}
    {/if}
  </Card>
</div>

<style src="../../../static/css/containers/dashboard/statistics.scss"></style>
