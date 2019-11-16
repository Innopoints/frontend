<script>
  import Button from 'ui/button.svelte';
  import DatePicker from 'ui/date-picker.svelte';
  import {filters, changeDate} from '@/store/projects';

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  export let open = false;
  $: value = open;
</script>

<li class:open={value} class="filter date-range panel">
  <svg src="images/icons/calendar.svg" class="icon mr" />
  <Button chevron classname="handle" on:click={() => dispatch('toggle')}>
    select date range
  </Button>
</li>
<DatePicker
    value={$filters.date}
    on:change={(e) => changeDate(e.detail)}
/>
