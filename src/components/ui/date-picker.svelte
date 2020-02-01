<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';

  export let classname = '';
  export let rangecontrolsclass = '';
  export let calendarclass = '';
  export let headerclass = '';
  export let weekdaysclass = '';
  export let daysclass = '';
  export let dayclass = '';

  export let range = false;
  export let value = null;

  const daysInWeek = 7;
  const monthsInYear = 12;
  export let months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ];
  export let weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let today = new Date();
  let shownYear = today.getFullYear();
  let shownMonth = today.getMonth();
  let selectingStart = true;
  $: thisMonthCalendar = getCalendar(shownMonth, shownYear);

  const dispatch = createEventDispatcher();

  function getCalendar(month, year) {
    const calendar = [];
    const dayCursor = new Date(year, month, 1);

    // The weekdays are counted from Sunday
    let monthStartWeekDay = dayCursor.getDay() - 1;
    if (monthStartWeekDay === -1) {
      monthStartWeekDay = 6;
    }

    // Offset the start of the month to the closest left Monday
    dayCursor.setDate(dayCursor.getDate() - monthStartWeekDay);

    do {
      let week = [];
      for (let i = 0; i < daysInWeek; ++i) {
        week.push({
          value: new Date(dayCursor.valueOf()),
          outside: dayCursor.getMonth() !== month,
        });
        dayCursor.setDate(dayCursor.getDate() + 1);
      }
      calendar.push(week);
    } while (dayCursor.getMonth() === month);

    return calendar;
  }

  function datesEqual(date1, date2) {
    if (date1 == null || date2 == null) {
      return false;
    }

    return (
      date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate()
    );
  }

  function select(date) {
    if (date.getFullYear() !== shownYear) {
      shownYear = date.getFullYear();
    }

    if (date.getMonth() !== shownMonth) {
      shownMonth = date.getMonth();
    }

    if (!range) {
      value = date;
      dispatch('change', value);
    } else {
      if (value == null) {
        value = {};
      }

      value[selectingStart ? 'start' : 'end'] = date;
      selectingStart = !selectingStart;

      if (value.start > value.end) {
        let temp = value.start;
        value.start = value.end;
        value.end = temp;
      }

      if (value.start != null && value.end != null) {
        dispatch('change', value);
      }
    }
  }

  function showPrevMonth() {
    shownMonth--;
    if (shownMonth < 0) {
      shownYear--;
      shownMonth = monthsInYear - 1;
    }
  }

  function showNextMonth() {
    shownMonth++;
    if (shownMonth > monthsInYear - 1) {
      shownYear++;
      shownMonth = 0;
    }
  }

  function clearSelection() {
    value = null;
    selectingStart = true;
    dispatch('change', null);
  }
</script>

<div class="date-picker {classname}">
  {#if range}
    <div class="range-controls {rangecontrolsclass}">
      <Button
        classname={selectingStart ? 'selected' : ''}
        on:click={() => selectingStart = true}
      >
        start date
      </Button>
      <Button
        classname={!selectingStart ? 'selected' : ''}
        on:click={() => selectingStart = false}
      >
        end date
      </Button>
      <Button isDanger on:click={clearSelection}>clear</Button>
    </div>
  {/if}
  <div class="calendar {calendarclass}">
    <div class="month-header {headerclass}">
      <Button isRound on:click={showPrevMonth}>
        <svg src="images/icons/chevron-left.svg" class="icon" />
      </Button>
      {months[shownMonth]} {shownYear}
      <Button isRound on:click={showNextMonth}>
        <svg src="images/icons/chevron-right.svg" class="icon" />
      </Button>
    </div>
    <div class="weekdays {weekdaysclass}">
      {#each weekdays as dayName (dayName)}
        <span class="weekday">{dayName}</span>
      {/each}
    </div>
    {#each thisMonthCalendar as week}
      <div class="days {daysclass}">
        <!--
          The following .day elements may have one of the classes:
          * .in-range: day is in range for range pickers
          * .selected: day is selected or is a range boundary
          * .outside:  day is not in this month
          * .today:    day is today
          * .start:    day is the beginning of a range
          * .end:      day is the end of a range
        -->
        {#each week as day}
          <div
            class="day {dayclass}"
            class:today={datesEqual(day.value, today)}
            class:outside={day.outside}
            class:selected={
              value != null && (
                range ?
                  datesEqual(day.value, value.start) || datesEqual(day.value, value.end)
                : datesEqual(day.value, value)
              )
            }
            class:start={value != null && range && datesEqual(day.value, value.start)}
            class:end={value != null && range && datesEqual(day.value, value.end)}
            class:in-range={
              value != null && range && value.start <= day.value && day.value <= value.end
            }
          >
            <Button on:click={() => select(day.value)}>{day.value.getDate()}</Button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
