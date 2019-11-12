<script>
  import Button from 'ui/button.svelte';
  import DatePicker from 'ui/date-picker.svelte';

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  export let open = false;
  $: value = open;
</script>

<li class:open={value} class="filter date-range panel">
  <svg src="images/icons/calendar.svg" class="icon mr" />
  <Button chevron={true} classname="handle" on:click={() => dispatch('toggle')}>
    select date range
  </Button>
</li>
<DatePicker calendarclass="mt" />
