<template>
  <div :class="open && 'open'" class="dropdown-shell no-border">
    <div @click="toggleDropdown" class="filter date-range">
      <img
        src="/images/events/calendar.svg"
        srcset="/images/events/calendar-mobile.svg 18w, /images/events/calendar.svg 24w"
        sizes="(min-width: 640px) 22px, 18px"
        class="drop-text-open"
      />
      <span class="hide-mb">select date range</span>
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
    data() {
      return {
        open: false
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
      }
    }
  };
</script>
