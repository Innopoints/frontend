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
  </section>
</template>

<script>
  import Vue from 'vue';
  import Event from '../../components/events/event';
  import events from '../../constants/events/events';
  export default Vue.extend({
    components: {
      Event,
    },
    data() {
      return {
        events,
      };
    },
  });
</script>
