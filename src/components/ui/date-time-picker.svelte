<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';
  import DatePicker from './date-picker.svelte';
  import TimePicker from './time-picker.svelte';

  export let classname = '';
  export let value = null;

  const dispatch = createEventDispatcher();

  let datePickerShown = true;
  let dateValue = value;
  let timeValue = { hours: value && value.getHours(), minutes: value && value.getMinutes() };

  function combineValues() {
    if (dateValue != null && timeValue.hours != null) {
      dateValue.setHours(timeValue.hours);
      dateValue.setMinutes(timeValue.minutes);
      value = dateValue;
      dispatch('change', value);
    } else {
      setTimeout(() => datePickerShown = dateValue == null, 10);
    }
  }

  function clear() {
    dateValue = null;
    timeValue = { hours: null, minutes: null };
    value = null;
    datePickerShown = true;
  }
</script>

<div class="date-time-picker {classname}">
  <div class="mode-switch">
    <Button isSmall isSelected={datePickerShown} on:click={() => datePickerShown = true}>
      date
    </Button>
    <Button isSmall isSelected={!datePickerShown} on:click={() => datePickerShown = false}>
      time
    </Button>
    <Button isDanger isSmall on:click={clear}>
      clear
    </Button>
  </div>

  {#if datePickerShown}
    <DatePicker bind:value={dateValue} on:change={combineValues} />
  {:else}
    <div class="time-wrapper">
      <svg class="icon" src="images/icons/clock.svg" />
      <TimePicker bind:value={timeValue} />
      <Button on:click={combineValues}>
        <svg class="icon mr" src="images/icons/check.svg" />
        select
      </Button>
    </div>
  {/if}
</div>
