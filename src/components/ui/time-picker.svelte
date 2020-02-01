<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';
  import TextField from './text-field.svelte';

  export let value = { hours: null, minutes: null };
  $: {
    if (value == null) {
      value = { hours: null, minutes: null };
    }
  }
  const minutesInHour = 60;
  const hoursInDay = 24;

  const dispatch = createEventDispatcher();

  function incHours() {
    if (value.hours == null) {
      value.hours = 0;
    } else {
      value.hours++;
      if (value.hours > hoursInDay - 1) {
        value.hours = 0;
      }
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }

  function decHours() {
    if (value.hours == null) {
      value.hours = 0;
    } else {
      value.hours--;
      if (value.hours < 0) {
        value.hours = hoursInDay - 1;
      }
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }

  function setHours({ detail: hours }) {
    if (+hours >= 0 && +hours < hoursInDay) {
      value.hours = hours;
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }

  function incMinutes() {
    if (value.minutes == null) {
      value.minutes = 0;
    } else {
      value.minutes++;
      if (value.minutes > minutesInHour - 1) {
        value.minutes = 0;
      }
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }

  function decMinutes() {
    if (value.minutes == null) {
      value.minutes = 0;
    } else {
      value.minutes--;
      if (value.minutes < 0) {
        value.minutes = minutesInHour - 1;
      }
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }

  function setMinutes({ detail: minutes }) {
    if (+minutes >= 0 && +minutes < minutesInHour) {
      value.minutes = minutes;
    }

    if (value.hours != null && value.minutes != null) {
      dispatch('change', value);
    }
  }
</script>

<div class="time-picker">
  <Button isRound on:click={incHours}>
    <svg class="icon" src="images/icons/chevron-up.svg" />
  </Button>
  <Button isRound on:click={incMinutes}>
    <svg class="icon" src="images/icons/chevron-up.svg" />
  </Button>
  <TextField
    type="number" isNoSpinner placeholder="23" max={23} min={0} maxlength={2}
    value={value && value.hours != null ? ('' + value.hours).padStart(2, '0') : ''}
    on:change={setHours}
  />
  <TextField
    type="number" isNoSpinner placeholder="59" max={59} min={0} maxlength={2}
    value={value && value.minutes != null ? ('' + value.minutes).padStart(2, '0') : ''}
    on:change={setMinutes}
  />
  <Button isRound on:click={decHours}>
    <svg class="icon" src="images/icons/chevron-down.svg" />
  </Button>
  <Button isRound on:click={decMinutes}>
    <svg class="icon" src="images/icons/chevron-down.svg" />
  </Button>
</div>
