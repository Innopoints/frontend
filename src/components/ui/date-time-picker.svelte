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
  $: timeValue = { hours: value && value.getHours(), minutes: value && value.getMinutes() };

  function combineValues({ detail }) {
    if (dateValue != null && timeValue.hours != null) {
      value = dateValue;
      dispatch('change', value);
    } else {
      setTimeout(() => datePickerShown = dateValue == null, 10);
    }
  }

  function clear() {
    dateValue = null;
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
    <DatePicker on:change={({ detail }) => {
      if (dateValue == null) {
        dateValue = detail;
      }
      dateValue.setFullYear(detail.getFullYear(), detail.getMonth(), detail.getDate());
      dispatch('change-date', dateValue);
      setTimeout(() => datePickerShown = false, 10);
    }} />
  {:else}
    <div class="time-wrapper">
      <svg class="icon" src="images/icons/clock.svg" />
      <TimePicker
        value={timeValue}
        on:change={({ detail }) => {
          if (dateValue == null)
            dateValue = new Date();
          dateValue.setHours(detail.hours, detail.minutes);
        }}
      />
      <Button on:click={combineValues}>
        <svg class="icon mr" src="images/icons/check.svg" />
        select
      </Button>
    </div>
  {/if}
</div>
