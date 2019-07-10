<template>
  <div :class="open && 'open'" class="dropdown-shell no-border">
    <div @click="toggleDropdown" class="filter date-range">
      <img
        src="/images/events/calendar.svg"
        srcset="/images/events/calendar-mobile.svg 18w, /images/events/calendar.svg 24w"
        sizes="(min-width: 640px) 22px, 18px"
        class="drop-text-open"
      />

      <span class="hide-mb">{{ calendarHeader }}</span>

      <img src="/images/events/chevron-down.svg" class="hide-mb dropdown-chevron" />
    </div>
    <div class="dropdown shadow-2 right-edge">
      <div class="drop-header">
        <div>
          <span @click="goToStart" :class="isFirstChoice && 'active'">start date</span>
          <span @click="goToEnd" :class="!isFirstChoice && 'active'">end date</span>
        </div>
        <div @click="clear" style="color:red; font-weight: 700;">clear</div>
        <img
          @click="toggleDropdown"
          src="/images/events/x.svg"
          sizes="(min-width: 640px) 24px, 18px"
          class="drop-close"
        />
      </div>

      <div class="calendar">
        <div class="month-header">
          <button @click="goPrevMonth" class="left" />
          {{ monthsLocale[activeMonthStart] + ' ' + activeYearStart }}
          <button @click="goNextMonth" class="right" />
        </div>
        <div class="weekdays">
          <div v-for="item in shortDaysLocale" :key="item">{{ item }}</div>
        </div>
        <div v-for="week in maxWeeks" :key="week" class="days">
          <!-- Next <div> element may have one of the classes:
          day-in-range, day-selected and day-disabled (if not in this month) -->
          <div
            v-for="day in numOfDays"
            :key="day"
            :class="[...getCellClass(week, day, startMonthDay, endMonthDate), 'day']"
            @click="selectFirstItem(week, day)"
          >
            <button v-html="getDayCell(week, day, startMonthDay, endMonthDate)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import fecha from 'fecha';

  export default {
    name: 'DateRange',
    data() {
      return {
        open: false,
        dateRange: {},
        numOfDays: 7,
        format: 'DD.MM.YY',
        isFirstChoice: true,
        activeMonthStart: new Date().getMonth(),
        activeYearStart: new Date().getFullYear(),
        activeYearEnd: new Date().getFullYear()
      };
    },
    computed: {
      ...mapState({
        startDate: state => state.events.startDate,
        endDate: state => state.events.endDate,
      }),

      calendarHeader() {
        if(this.getDateString(this.dateRange.start)) {
          let start = this.getDateString(this.dateRange.start);
          let end = '...';
          if(this.dateRange.end) {
            end = this.getDateString(this.dateRange.end);
            if(start === end) return start;
          }
          return  start + ' – ' + end;
        } else {
          return 'select date range';
        }
      },
      monthsLocale() {
        return ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
      },
      shortDaysLocale() {
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      },
      today() {
        return fecha.format(new Date(), 'YYYY-MM-DD');
      },
      startMonthDay() {
        return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0)).getDay();
      },
      endMonthDate() {
        return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate();
      },
      maxWeeks() {
        return Math.ceil((this.startMonthDay + this.endMonthDate) / 7);
      },
      startNextActiveMonth: function () {
        return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1;
      },
    },
    watch: {
      startNextActiveMonth: function (value) {
        if (value === 0) this.activeYearEnd = this.activeYearStart + 1;
      }
    },
    created () {
      if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1;
    },
    methods: {
      toggleDropdown() {
        this.open = !this.open;
      },

      compareDates(date1, date2) {
        let d1 = fecha.format(new Date(date1), 'YYYY-MM-DD');
        let d2 = fecha.format(new Date(date2), 'YYYY-MM-DD');

        if(d1 === d2) return 0;
        return d1 > d2 ? 1 : -1;
      },
      getDateString(date, format = this.format) {
        if (!date) {
          return null;
        }
        const dateparse = new Date(Date.parse(date));
        return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format);
      },
      getDayIndexInMonth(week, day, startMonthDay) {
        const date = (this.numOfDays * (week - 1)) + day;
        return date - startMonthDay;
      },
      getDayCell (week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);

        if(result < 1) {
          let end = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth - 1, 0)).getDate();
          return result + end;
        } else if(result > endMonthDate) {
          return result - endMonthDate;
        } else {
          return result;
        }
      },
      getNewDateRange(result, activeMonth, activeYear) {
        const newDate = {};
        let key = 'start';
        if (!this.isFirstChoice) {
          key = 'end';
          setTimeout(() => this.toggleDropdown(), 500);
        } else {
          newDate['end'] = null;
        }
        const resultDate = new Date(Date.UTC(activeYear, activeMonth, result));
        if (!this.isFirstChoice && resultDate < this.dateRange.start) {
          this.isFirstChoice = false;
          return { start: resultDate };
        }

        this.isFirstChoice = !this.isFirstChoice;
        newDate[key] = resultDate;

        return newDate;
      },
      selectFirstItem(week, day) {
        const result = this.getDayIndexInMonth(week, day, this.startMonthDay);
        this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart, this.activeYearStart));
      },

      getCellClass(week, day, startMonthDay, endMonthDate) {
        let arr = [];
        if(this.isDateInRange(week, day, startMonthDay, endMonthDate)) {
          arr.push('in-range');
        }
        if(this.isDateDisabled(week, day, startMonthDay, endMonthDate)) {
          arr.push('outside');
        }
        if(this.isToday(week, day, startMonthDay, endMonthDate)) {
          arr.push('today');
        }

        arr.push(...this.isDateSelected(week, day, startMonthDay, endMonthDate));

        return arr;
      },
      isDateSelected(week, day, startMonthDay) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        let currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));

        if(this.dateRange.start && !this.dateRange.end && this.compareDates(this.dateRange.start, currDate) === 0) return ['selected'];
        else if(this.dateRange.start && this.dateRange.end &&
          this.compareDates(this.dateRange.start, this.dateRange.end) === 0 &&
          this.compareDates(this.dateRange.start, currDate) === 0) return ['in-range', 'start', 'end'];
        else if(this.dateRange.start && this.compareDates(this.dateRange.start, currDate) === 0) return ['in-range', 'start'];
        else if (this.dateRange.end && this.compareDates(this.dateRange.end, currDate) === 0) return ['in-range', 'end'];
        else return [''];
      },
      isDateInRange(week, day, startMonthDay) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        let currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));

        return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
          (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime());
      },
      isDateDisabled(week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        return !(result > 0 && result <= endMonthDate);
      },
      isToday(week, day, startMonthDay) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        let currDate = fecha.format(new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result)), 'YYYY-MM-DD');

        return this.today === currDate;
      },

      goPrevMonth() {
        const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0));
        this.activeMonthStart = prevMonth.getMonth();
        this.activeYearStart = prevMonth.getFullYear();
        this.activeYearEnd = prevMonth.getFullYear();
      },
      goNextMonth() {
        const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1));
        this.activeMonthStart = nextMonth.getMonth();
        this.activeYearStart = nextMonth.getFullYear();
        this.activeYearEnd = nextMonth.getFullYear();
      },

      goToEnd() {
        if(!this.dateRange.start) this.dateRange.start = new Date(this.today);
        this.dateRange.end = null;
        this.isFirstChoice = false;
      },
      goToStart() {
        this.isFirstChoice = true;
      },
      clear() {
        this.isFirstChoice = true;
        this.dateRange = [null, null];
      }
    }
  };
</script>

<style scoped>
  .dropdown {
    flex-direction: column;
    width: 290px;
  }

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
  }

  .month-header .left {
    background-image: url("../../../static/images/events/chevron-left.svg");
  }

  .month-header .right {
    background-image: url("../../../static/images/events/chevron-right.svg");
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
