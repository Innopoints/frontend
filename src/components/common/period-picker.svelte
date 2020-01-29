<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import datePeriods from '@/constants/date-periods.js';

  export let label;
  export let selectedPeriod = datePeriods[0];

  const dispatch = createEventDispatcher();
</script>

<style>
  .period-list {
    margin-top: 1em !important;
    min-width: 10.8em;
  }
</style>

<Dropdown let:toggle={toggle}>
  <span slot="label">
    {(selectedPeriod.name.startsWith('last') ? 'over the ' : 'for ') + selectedPeriod.name}
  </span>
  <span class="label">{label}</span>
  <ul class="period-list">
    {#each datePeriods as period (period.name)}
      <li>
        <Button 
          on:click={() => { toggle(); selectedPeriod = period; dispatch('period-change', period); }}
        >
          {period.name}
        </Button>
      </li>
    {/each}
  </ul>
</Dropdown>
