<section class={classname}>
  <!--
  {#if withControls}
    <div class={controlsclass}>
      <div>
        <Button class={isFirstChoice ? activeclass : ''} on:click={goToStart}>start date</Button>
        <Button class={isFirstChoice ? '' : activeclass} on:click={goToEnd}>end date</Button>
      </div>
      <Button danger on:click={clear}>clear</Button>
    </div>
  {/if}
  -->

  <div class={calendarclass}>
    <div class={headerclass}>
      <Button>
        <svg src="images/icons/chevron-left.svg" class="icon" />
      </Button>
      month
      <Button>
        <svg src="images/icons/chevron-right.svg" class="icon" />
      </Button>
    </div>
    <div class={weekclass}>
      {#each daysNames as dayName (dayName)}
        <div>{dayName}</div>
      {/each}
    </div>
    {#each new Array(maxWeeks) as w, week (week)}
      <div class={daysclass}>
        <!-- Next <div> element may have one of the classes:
      day-in-range, day-selected and day-disabled (if not in this month) -->
      {#each new Array(numOfDays) as d, day (day)}
        <div class="{dayclass} {getDayClass(week, day)}">
          <button>{getDayCell(week + 1, day + 1)}</button>
        </div>
      {/each}
        <!--<div
            :class="[...getCellClass(week, day, startMonthDay, endMonthDate), 'day']"
            @click="selectFirstItem(week, day)"
        >
          <button v-html="getDayCell(week, day, startMonthDay, endMonthDate)" />
        </div>-->
      </div>
    {/each}
  </div>
</section>

<script>
  // import fecha from 'fecha';
  import Button from './button.svelte';

  export let withControls = true;
  export let format = 'YYYY-MM-DD';
  export let range = true;
  export let start = null;
  export let end = null;
  export let numOfDays = 7;

  export let classname = '';
  export let controlsclass = 'drop-header';
  export let activeclass = 'active';
  export let calendarclass = 'calendar';
  export let headerclass = 'month-header';
  export let weekclass = 'weekdays';
  export let daysclass = 'days';
  export let dayclass = 'day';

  export let monthsNames = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  export let daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // const today = fecha.format(new Date(), format);
  let activeMonthStart = new Date().getMonth();
  let activeYearStart = new Date().getFullYear();
  let activeYearEnd = new Date().getFullYear();
  let startNextActiveMonth = activeMonthStart >= 11 ? 0 : activeMonthStart + 1;

  const startMonthDate = new Date(Date.UTC(activeYearStart, activeMonthStart, 0)).getDay();
  const endMonthDate = new Date(Date.UTC(activeYearEnd, startNextActiveMonth, 0)).getDate();
  const maxWeeks = Math.ceil((startMonthDate + endMonthDate) / 7);

  const getDayCell = (week, day) => {
    const result = getDayIndexInMonth(week, day);

    if (result < 1) {
      return result + new Date(Date.UTC(activeYearEnd, startNextActiveMonth - 1, 0)).getDate();
    } else if (result > endMonthDate) {
      return result - endMonthDate;
    } else {
      return result;
    }
  };

  const getDayIndexInMonth = (week, day) => ((numOfDays * (week - 1)) + day) - startMonthDate;
  const getDayClass = (week, day) => '';
</script>

<svelte:head>
  <style>
    .drop-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .5em 1em;
    }

    .drop-header > div {
      margin-left: 24px;
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .drop-header span {
      padding: .8em .8em;
      border-radius: 25px;
    }

    .drop-header span {
      color: #888;
    }

    .drop-header span.active {
      background-color: rgba(56, 120, 0, .12);
      color: #387800;
    }

    .month-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 1em;
      border: 0 solid #ccc;
      border-top-width: 1px;
      border-bottom-width: 1px;
      padding: .5em 0;
      color: #387800;
      font-weight: 500;
    }

    .month-header button {
      background: none;
      border: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      background-size: cover;
      margin: 0 2em;
      padding: .1em;
    }

    .calendar {
      margin-bottom: 1em;
    }

    .weekdays {
      margin: 1em 1em .5em;
      display: flex;
    }

    .weekdays > div {
      color: #888;
      font-size: .8rem;
      width: 14.285714285714286%;  /* 100% / 7 */
      text-align: center;
    }

    .days {
      display: flex;
    }

    .day.today > button {
      color: #387800;
    }

    .days > .day {
      font-size: 1rem;
      width: 14.285714285714286%;  /* 100% / 7 */
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .day > button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1px;
      font-weight: 500;
      border: none;
      background: none;
      z-index: 2;
    }

    .day:hover > button {
      background-color: rgba(56, 120, 0, .08);
    }

    .day.selected > button {
      background-color: #BABABA;
      color: #222;
    }

    .day.in-range.start > button,
    .day.in-range.end > button,
    .day.selected > button {
      background-color: #70a565;
      color: #fff;
    }

    .day.outside > button {
      color: #bbb;
    }

    .day.outside.in-range > button {
      color: #fff;
    }

    .day.in-range::before {
      background-color: rgba(56, 120, 0, .25);
      content: "";
      height: 30px;
      left: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    .day:last-child {
      padding-right: 1em;
    }

    .day:first-child {
      padding-left: 1em;
    }

    .day.start::before {
      left: 15px;
    }

    .day.start:first-child::before {
      left: calc(1em + 15px);
    }

    .day.end::before {
      right: 15px;
    }

    .day.end:last-child::before {
      right: calc(1em + 15px);
    }
  </style>
</svelte:head>
