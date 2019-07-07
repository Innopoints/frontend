<template>
  <section class="events">
    <h1>Ongoing events</h1>
    <!-- Filters here -->
    <div class="cards">
      <Event
        v-for="(event, i) in events"
        :key="i"
        v-bind="event"
      />
    </div>

    <Pagination :page-count="pageCount" v-model="currentPage" />
  </section>
</template>

<script>
  import Event from '../../components/events/event';
  import Pagination from '../../components/pagination';
  import allEvents from '../../constants/events/events';
  export default {
    components: {
      Event,
      Pagination
    },
    data() {
      return {
        eventsPerPage: 8,
        currentPage: 1,
        allEvents,
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.allEvents.length / this.eventsPerPage);
      },
      events() {
        const page = this.currentPage - 1;
        const start = this.eventsPerPage * page;
        const end = start + this.eventsPerPage;
        return this.allEvents.slice(start, end);
      },
    },
  };
</script>

<style scoped>
.events {
  /* Should be temporary */
  margin-bottom: 50px;
}
</style>
