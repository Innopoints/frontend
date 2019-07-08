<template>
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
</template>

<script>
  import Event from '../../components/events/event';
  import events from '../../constants/events/events';
  import Filters from './filters';

  export default {
    components: {
      Filters,
      Event,
    },
    data() {
      return {
        events,
      };
    },
  };
</script>
