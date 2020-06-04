<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, DropdownShell, Dropdown, Label } from 'attractions';
  import datePeriods from '@/constants/date-periods.js';

  export let label;
  export let value = datePeriods[2];

  const dispatch = createEventDispatcher();
</script>

<DropdownShell let:toggle>
  <Button on:click={toggle}>
    {(value.name.startsWith('last') ? 'over the ' : 'for ') + value.name}
    <svg src="images/icons/chevron-down.svg" class="dropdown-chevron ml" />
  </Button>
  <Dropdown>
    <div class="relative-wrapper">
      <Button neutral round class="close" on:click={toggle}>
        <svg src="images/icons/x.svg" class="icon" />
      </Button>
      <Label>{label}</Label>
      <ul class="period-list">
        {#each datePeriods as period (period.name)}
          <li>
            <Button
              on:click={() => {
                value = period;
                dispatch('change', period);
                toggle();
              }}
            >
              {period.name}
            </Button>
          </li>
        {/each}
      </ul>
    </div>
  </Dropdown>
</DropdownShell>

<style src="../../../static/css/components/common/period-picker.scss"></style>
