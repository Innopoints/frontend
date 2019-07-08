<template>
  <div class="calendar-root">
    <div @click="toggleCalendar()" class="input-date">
      {{ getDateString(dateRange.start) }} - {{ getDateString(dateRange.end) }}
    </div>
    <div class="calendar calendar-mobile">
      <div class="calendar-wrap">
        <div v-if="isOpen" class="calendar_month_left calendar-left-mobile">
          <div class="months-text">
            <i @click="goPrevMonth" class="left" />
            <i @click="goNextMonth" class="right" />
            {{ monthsLocale[activeMonthStart] + ' ' + activeYearStart }}</div>
          <ul class="calendar_weeks">
            <li v-for="item in shortDaysLocale" :key="item">{{ item }}</li>
          </ul>
          <ul v-for="week in 6" :key="week" class="calendar_days">
            <li
              v-for="day in numOfDays"
              :key="day"
              :class="[getCellClass(week, day, startMonthDay, endMonthDate)]"
              v-html="getDayCell(week, day, startMonthDay, endMonthDate)"
              @click="selectFirstItem(week, day)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fecha from 'fecha';

  export default {
    name: 'RangePicker',
    data () {
      return {
        dateRange: {},
        numOfDays: 7,
        format: 'DD MMM YYYY',
        isFirstChoice: true,
        isOpen: false,
        activeMonthStart: new Date().getMonth(),
        activeYearStart: new Date().getFullYear(),
        activeYearEnd: new Date().getFullYear()
      };
    },
    computed: {
      monthsLocale: function () {
        return ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
      },
      shortDaysLocale: function () {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      },
      startMonthDay: function () {
        return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getDay();
      },
      endMonthDate: function () {
        return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate();
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
      if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1
    },
    methods: {
      toggleCalendar: function () {
        this.isOpen = !this.isOpen;
      },
      getDateString: function (date, format = this.format) {
        if (!date) {
          return null;
        }
        const dateparse = new Date(Date.parse(date));
        return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format);
      },
      getDayIndexInMonth: function (week, day, startMonthDay) {
        const date = (this.numOfDays * (week - 1)) + day;
        return date - startMonthDay;
      },
      getDayCell (week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        // bound by > 0 and < last day of month
        return result > 0 && result <= endMonthDate ? result : '&nbsp;';
      },
      getNewDateRange (result, activeMonth, activeYear) {
        const newData = {};
        let key = 'start';
        if (!this.isFirstChoice) {
          key = 'end';
        } else {
          newData['end'] = null;
        }
        const resultDate = new Date(Date.UTC(activeYear, activeMonth, result));
        if (!this.isFirstChoice && resultDate < this.dateRange.start) {
          this.isFirstChoice = false;
          return { start: resultDate };
        }

        // toggle first choice
        this.isFirstChoice = !this.isFirstChoice;
        newData[key] = resultDate;
        return newData;
      },
      selectFirstItem (week, day) {
        const result = this.getDayIndexInMonth(week, day, this.startMonthDay);
        this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart, this.activeYearStart));
      },

      getCellClass (week, day, startMonthDay, endMonthDate) {
        if(this.isDateInRange(week, day, startMonthDay, endMonthDate)) {
          return 'calendar_days_in-range';
        } else if(this.isDateDisabled(week, day, startMonthDay, endMonthDate)) {
          return 'calendar_days--disabled';
        } else if(this.isDateSelected(week, day, startMonthDay, endMonthDate)) {
          return 'calendar_days_selected';
        }
      },
      isDateSelected (week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        if (result < 1 || result > endMonthDate) return false;
        let currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));

        return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
          (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime());
      },
      isDateInRange (week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        if (result < 2 || result > endMonthDate) return false;
        let currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));

        return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
          (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime());
      },
      isDateDisabled (week, day, startMonthDay, endMonthDate) {
        const result = this.getDayIndexInMonth(week, day, startMonthDay);
        // bound by > 0 and < last day of month
        return !(result > 0 && result <= endMonthDate);
      },

      goPrevMonth () {
        const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0));
        this.activeMonthStart = prevMonth.getMonth();
        this.activeYearStart = prevMonth.getFullYear();
        this.activeYearEnd = prevMonth.getFullYear();
      },
      goNextMonth () {
        const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1));
        this.activeMonthStart = nextMonth.getMonth();
        this.activeYearStart = nextMonth.getFullYear();
        this.activeYearEnd = nextMonth.getFullYear();
      },
    }
  };
</script>

<style scoped>
  .input-date {
    display: block;
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 14px;
    width: 230px;
    cursor: pointer;
  }

  .input-date::after {
    content: "▼";
    float: right;
    font-size: smaller;
  }

  .months-text {
    text-align: center;
    font-weight: bold;
  }

  .months-text .left {
    float: left;
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiMwMDZERjAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
  }

  .months-text .right {
    float: right;
    cursor: pointer;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjMDA2REYwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=");
  }

  .calendar {
    display: block;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    width: 700px;
    font-size: 12px;
    height: 300px;
    box-shadow: -3px 4px 12px -1px #ccc;
    background: #fff;
    position: absolute;
    z-index: 9;
  }

  .calendar-head h2 {
    padding: 20px 0 0 20px;
    margin: 0;
  }

  .calendar ul {
    list-style-type: none;
  }

  .calendar-wrap {
    display: inline-block;
    float: left;
    width: 75%;
    padding: 10px;
  }

  .calendar-left-mobile {
    width: 100% !important;
  }

  .calendar_month_left {
    float: left;
    width: 43%;
    padding: 10px;
    margin: 5px;
  }

  .calendar_weeks {
    margin: 0;
    padding: 10px 0;
    width: auto;
  }

  .calendar_weeks li {
    display: inline-block;
    width: 13.6%;
    color: #999;
    text-align: center;
  }

  .calendar_days {
    margin: 0;
    padding: 0;
  }

  .calendar_days li {
    display: inline-block;
    width: 13.6%;
    color: #333;
    text-align: center;
    cursor: pointer;
    line-height: 2em;
  }

  .calendar_preset li {
    line-height: 2.6em;
    width: auto;
    display: block;
  }

  .calendar_days li:hover {
    background: #eee;
    color: #000;
  }
  li.calendar_days--disabled{
    pointer-events: none;
  }

  li.calendar_days_selected {
    background: #005a82;
    color: #fff;
  }

  li.calendar_days_in-range {
    background: #0096d9;
    color: #fff;
  }

  .calendar_preset {
    padding: 0;
  }

  .calendar-mobile {
    width: 260px;
    z-index: 1;
    box-shadow: none;
  }
</style>
