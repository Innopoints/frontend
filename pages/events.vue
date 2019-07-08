<template>
  <div>
    <EventsTagline />

    <section class="events">
      <h1>Ongoing events</h1>

      <Filters />

      <div class="cards">
        <Event
          v-for="(event, i) in events"
          :key="i"
          v-bind="event"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import EventsTagline from '../components/events/tagline';
  import events from '../constants/events/events';
  import Filters from '../containers/events/filters';

  export default {
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` }
      ]
    },
    components: {
      Filters,
      EventsTagline,
      Event: () => import('../components/events/event'),
    },
    data() {
      return {
        events,
      };
    },
  };
</script>

<style src="../static/css/events/filters.css" />
<style src="../static/css/events/ordering.css" />
