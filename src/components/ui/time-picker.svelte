<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';
  import TextField from './text-field.svelte';

  export let value = { hours: null, minutes: null };
  if (value == null) {
    value = { hours: null, minutes: null };
  }
  const minutesInHour = 60;
  const hoursInDay = 24;

  const dispatch = createEventDispatcher();

  function setHours(hours) {
    if (hours < 0) {
      value.hours = hoursInDay - 1;
    } else if (hours >= hoursInDay) {
      value.hours = 0;
    } else {
      value.hours = hours;
    }

    if (value.minutes != null) {
      dispatch('change', value);
    }
  }

  function setMinutes(minutes) {
    if (minutes < 0) {
      value.minutes = minutesInHour - 1;
    } else if (minutes >= minutesInHour) {
      value.minutes = 0;
    } else {
      value.minutes = minutes;
    }

    if (value.hours != null) {
      dispatch('change', value);
    }
  }
</script>

<div class="time-picker">
  <Button isRound on:click={() => setHours(value.hours + 1)}>
    <svg class="icon" src="images/icons/chevron-up.svg" />
  </Button>
  <Button isRound on:click={() => setMinutes(value.minutes + 1)}>
    <svg class="icon" src="images/icons/chevron-up.svg" />
  </Button>
  <TextField
    type="number" isNoSpinner placeholder={hoursInDay - 1}
    max={hoursInDay - 1} min={0} maxlength={2}
    value={value && value.hours != null ? ('' + value.hours).padStart(2, '0') : ''}
    on:change={({ detail: hours }) => setHours(+hours)}
  />
  <TextField
    type="number" isNoSpinner placeholder={minutesInHour - 1}
    max={minutesInHour - 1} min={0} maxlength={2}
    value={value && value.minutes != null ? ('' + value.minutes).padStart(2, '0') : ''}
    on:change={({ detail: minutes }) => setMinutes(+minutes)}
  />
  <Button isRound on:click={() => setHours(value.hours - 1)}>
    <svg class="icon" src="images/icons/chevron-down.svg" />
  </Button>
  <Button isRound on:click={() => setMinutes(value.minutes - 1)}>
    <svg class="icon" src="images/icons/chevron-down.svg" />
  </Button>
</div>
