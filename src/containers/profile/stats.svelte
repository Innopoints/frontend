<script>
  import Button from 'ui/button.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import TopStats from '@/components/profile/top-stats.svelte';
  import CompetencesStats from '@/components/profile/competences-stats.svelte';
  import periods from '@/constants/profile/stats-periods';

  let activePeriod = periods[0];
  let dateRange = false;
</script>

<section class="statistics">
  <div class="period">
    <span class="hide-tb">Showing statistics</span>
    <Dropdown>
      <span slot="label">{activePeriod.label.indexOf('last') !== -1 ? 'over the ' : 'for '}{activePeriod.label}</span>
      <span class="label">Period of statistics</span>
      {#if !dateRange}
        <ul class="mt">
          {#each periods as period (period.id)}
            <li>
              <Button>
                {period.label}
              </Button>
            </li>
          {/each}
        </ul>
        <hr data-text="or" />
      {/if}
      <Button classname="mt btn">
        <svg src="images/icons/calendar.svg" class="icon mr" />
        select date range
      </Button>
    </Dropdown>
  </div>

  <Button>
    <svg src="images/icons/file-text.svg" class="mr" />
    create a volunteer report
  </Button>

  <TopStats />

  <CompetencesStats />
</section>
