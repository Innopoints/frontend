<template>
  <div class="material">
    <EventsTagline />

    <section class="events padded">
      <h1>Ongoing events</h1>

      <Filters />
      <Ordering />

      <div class="cards">
        <Event
          v-for="(event, i) in events"
          :key="i"
          v-bind="event"
        />
      </div>
    </section>

    <div class="center">
      <Button img="/images/events/history.svg" label="see past events" />
    </div>

    <!--<Pagination v-if="pageCount > 1" :page-count="pageCount" v-model="currentPage" />-->

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The <nuxt-link to="/shop">InnoStore</nuxt-link> has your answers!
    </p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Filters from '../containers/events/filters';
  import EventsTagline from '../components/events/tagline';
  import Ordering from '../components/events/filters/ordering';
  import Button from '../components/ui/button';
  // import Pagination from '../components/pagination';

  export default {
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` }
      ]
    },
    components: {
      Button,
      // Pagination,
      Ordering,
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

<style lang="scss" src="../static/css/events/index.scss" />
