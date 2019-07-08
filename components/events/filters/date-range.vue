<template>
  <div :class="open && 'open'" class="dropdown-shell no-border">
    <div @click="toggleDropdown" class="filter date-range">
      <img
        src="/images/events/calendar.svg"
        srcset="/images/events/calendar-mobile.svg 18w, /images/events/calendar.svg 24w"
        sizes="(min-width: 640px) 22px, 18px"
        class="drop-text-open"
      />
      <!--<span class="hide-mb">select date range</span>-->

      <RangePicker />
      <img src="/images/events/chevron-down.svg" class="hide-mb dropdown-chevron" />
    </div>
    <div class="dropdown shadow-2 right-edge">
      <span>start date</span>
      <span>end date</span>
      <img
        @click="toggleDropdown"
        src="/images/events/x.svg"
        sizes="(min-width: 640px) 24px, 18px"
        class="drop-close"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'DateRange',
    components: {
      RangePicker: () => import('./range-picker')
    },
    data() {
      return {
        open: false,
        range: {
          start: new Date(2018, 0, 16),
          end: new Date(2018, 0, 19)
        }
      };
    },
    computed: {
      ...mapState({
        startDate: state => state.events.startDate,
        endDate: state => state.events.endDate,
      })
    },
    methods: {
      toggleDropdown() {
        this.open = !this.open;
      },
      onDateSelected: function (daterange) {
        console.log(daterange);
      },
    }
  };
</script>
