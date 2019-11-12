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
      <Button on:click={goPrevMonth}>
        <svg src="images/icons/chevron-left.svg" class="icon" />
      </Button>
      {monthsNames[activeMonthStart] + ' ' + activeYearStart}
      <Button on:click={goNextMonth}>
        <svg src="images/icons/chevron-right.svg" class="icon" />
      </Button>
    </div>
    <div class={weekclass}>
      {#each daysNames as dayName (dayName)}
        <div>{dayName}</div>
      {/each}
    </div>
    {#each days as week, weeki (weeki)}
      <div class={daysclass}>
        <!--
          Next <div> element may have one of the classes:
          day-in-range, day-selected and day-disabled (if not in this month)
        -->
        {#each week as day (day.index)}
          <div class="{dayclass} {day.classes}">
            <button on:click={() => selectItem(weeki, day.index)}>{day.index}</button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</section>

<script>
  import fecha from 'fecha';
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
  export let selectedclass = 'selected';
  export let inrangeclass = 'in-range';
  export let disabledclass = 'outside';
  export let todayclass = 'today';
  export let startclass = 'start';
  export let endclass = 'end';

  export let monthsNames = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  export let daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const today = fecha.format(new Date(), format);
  let isFirstChoice = true;
  let activeMonthStart = new Date().getMonth();
  let activeYearStart = new Date().getFullYear();
  let activeYearEnd = new Date().getFullYear();

  $: dateRange = {start, end};
  $: startNextActiveMonth = activeMonthStart >= 11 ? 0 : activeMonthStart + 1;
  $: startMonthDate = new Date(Date.UTC(activeYearStart, activeMonthStart, 0)).getDay();
  $: endMonthDate = new Date(Date.UTC(activeYearEnd, startNextActiveMonth, 0)).getDate();
  $: days = getDays();
  $: getDays = () => {
    let arr = [];
    const maxWeeks = Math.ceil((startMonthDate + endMonthDate) / numOfDays);
    for (let week = 1; week - 1 < maxWeeks; week++) {
      let row = [];
      for (let day = 1; day - 1 < numOfDays; day++) {
        row.push({
          index: getDayCell(week, day),
          classes: getDayClass(week, day),
        });
      }
      arr.push(row);
    }
    return arr;
  };

  const getDayCell = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    if (result < 1) {
      return result + new Date(Date.UTC(activeYearEnd, startNextActiveMonth - 1, 0)).getDate();
    } else if (result > endMonthDate) {
      // todo: something wrong is here. not rerenders month oct-nov, jan-aug
      return result - endMonthDate;
    } else {
      return result;
    }
  };

  const getDayClass = (week, day) => {
    let arr = [];

    // Give proper classes for day cells
    if (isDateInRange(week, day))
      arr.push(inrangeclass);
    if (isDateDisabled(week, day))
      arr.push(disabledclass);
    if (isToday(week, day))
      arr.push(todayclass);

    arr.concat(isDateSelected(week, day));
    return arr.join(' ');
  };

  const selectItem = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    dateRange = Object.assign({}, dateRange, getNewDateRange(result));
    if (range) {
      if (dateRange.start !== null && dateRange.end !== null) {
        console.log(dateRange);
        // this.$emit('changeAll', {start: this.getDateString(this.dateRange.start), end: this.getDateString(this.dateRange.end)});
      } else {
        console.log('done');
        // isApplyDisabled = true;
      }
    } else {
      console.log('pick', getDateString(dateRange.start));
      // this.$emit('pick', this.getDateString(this.dateRange.start));
    }
  };

  // Change months by clicking on the arrows
  const goPrevMonth = () => {
    const prevMonth = new Date(Date.UTC(activeYearStart, activeMonthStart, 0));
    activeMonthStart = prevMonth.getMonth();
    activeYearStart = prevMonth.getFullYear();
    activeYearEnd = prevMonth.getFullYear();
    days = getDays();
  };
  const goNextMonth = () => {
    const nextMonth = new Date(Date.UTC(activeMonthStart >= 11 ? activeYearStart + 1 : activeYearStart, startNextActiveMonth, 1));
    activeMonthStart = nextMonth.getMonth();
    activeYearStart = nextMonth.getFullYear();
    activeYearEnd = nextMonth.getFullYear();
    days = getDays();
  };


  // UTILS
  const getDayIndexInMonth = (week, day) => ((numOfDays * (week - 1)) + day) - startMonthDate;

  const isToday = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    return today === fecha.format(new Date(Date.UTC(activeYearStart, activeMonthStart, result)), 'YYYY-MM-DD');
  };

  const isDateSelected = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    let currDate = new Date(Date.UTC(activeYearStart, activeMonthStart, result));

    // Apply selected classes for days. If object dayClasses has !!dayClasses.start - then
    // apply different classes for start and end dates, also + inRange class for them
    if (dateRange.start && !dateRange.end && compareDates(dateRange.start, currDate) === 0) return [selectedclass];
    else if (dateRange.start && dateRange.end &&
        compareDates(dateRange.start, dateRange.end) === 0 &&
        compareDates(dateRange.start, currDate) === 0)
      return startclass ? [inrangeclass, startclass, endclass] : [selectedclass];
    else if (dateRange.start && compareDates(dateRange.start, currDate) === 0)
      return startclass ? [inrangeclass, startclass] : [selectedclass];
    else if (dateRange.end && compareDates(dateRange.end, currDate) === 0)
      return startclass ? [inrangeclass, endclass] : [selectedclass];
    else return [''];
  };

  const isDateInRange = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    let currDate = new Date(Date.UTC(activeYearStart, activeMonthStart, result));

    return (dateRange.start && dateRange.start.getTime() < currDate.getTime()) &&
        (dateRange.end && dateRange.end.getTime() > currDate.getTime());
  };
  const isDateDisabled = (week, day) => {
    const result = getDayIndexInMonth(week, day);
    return !(result > 0 && result <= endMonthDate);
  };

  const getDateString = (date) => {
    if (!date) return null;

    const dateparse = new Date(Date.parse(date));
    return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format);
  };

  const compareDates = (date1, date2) => {
    // Simple strings comparison using fecha format
    let d1 = fecha.format(new Date(date1), 'YYYY-MM-DD');
    let d2 = fecha.format(new Date(date2), 'YYYY-MM-DD');

    if(d1 === d2) return 0;
    return d1 > d2 ? 1 : -1;
  };

  const getNewDateRange = (result) => {
    const newDate = {};
    let key = 'start';

    if (!isFirstChoice && range) key = 'end';
    else newDate['end'] = null;

    const resultDate = new Date(Date.UTC(activeYearStart, activeMonthStart, result));
    if (!isFirstChoice && resultDate < dateRange.start) {
      isFirstChoice = false;
      return { start: resultDate };
    }
    isFirstChoice = !isFirstChoice;
    newDate[key] = resultDate;

    return newDate;
  };
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
