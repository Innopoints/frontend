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
