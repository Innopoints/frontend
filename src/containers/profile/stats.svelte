<script>
  import Button from 'ui/button.svelte';
  import TopStats from '@/components/profile/top-stats.svelte';
  import CompetencesStats from '@/components/profile/competences-stats.svelte';
</script>

<section class="statistics">
  <div class="period">
    <span class="hide-tb">Showing statistics</span>
    <!--TODO: this dropdown-->
    <!--<Dropdown>
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
    </Dropdown>-->
  </div>

  <Button>
    <svg src="images/icons/file-text.svg" class="mr" />
    create a volunteer report
  </Button>

  <TopStats />

  <CompetencesStats />
</section>
