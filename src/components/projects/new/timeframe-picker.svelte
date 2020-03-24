<script>
  import { createEventDispatcher } from 'svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import DatePicker from 'ui/date-picker.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';

  export let value;
  export let errorNotSpecified;

  const dispatch = createEventDispatcher();
</script>

<Dropdown noclose let:toggle>
  <svg src="images/icons/calendar.svg" class="icon mr-2" slot="label" />
  <span slot="label">
    {value != null ? formatDateRange(value) : 'select date range'}
  </span>
  <DatePicker
    range
    {value}
    on:change={({ detail: timeframe }) => {
      if (timeframe != null) {
        setTimeout(toggle, 150);
      }
      value = timeframe;
      errorNotSpecified = value == null;
      dispatch('change', value);
    }}
  />
</Dropdown>
