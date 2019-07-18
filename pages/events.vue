<template>
  <div>
    <EventsTagline />

    <section class="events">
      <h1 id="events-top">Ongoing events</h1>

      <Filters />

      <div class="cards">
        <Event
          v-for="(event, i) in events"
          :key="i"
          v-bind="event"
        />
      </div>

      <Pagination v-if="pageCount > 1" :page-count="pageCount" v-model="currentPage" />
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Filters from '../containers/events/filters';
  import EventsTagline from '../components/events/tagline';
  import Pagination from '../components/pagination';

  export default {
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` }
      ]
    },
    components: {
      Pagination,
      Filters,
      EventsTagline,
      Event: () => import('../components/events/event'),
    },
    data() {
      return {
        eventsPerPage: 8,
        currentPage: 1,
      };
    },
    computed: {
      ...mapGetters({
        allEvents: 'events/events'
      }),
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
