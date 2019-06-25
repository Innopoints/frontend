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

    <Pagination :page-count="27" />
  </section>
</template>

<script>
  import Event from '../../components/events/event';
  import Pagination from '../../components/pagination';
  import events from '../../constants/events/events';
  export default {
    components: {
      Event,
      Pagination
    },
    data() {
      return {
        events,
      };
    },
  };
</script>

<style scoped>
.events {
  /* Should be temporary */
  margin-bottom: 50px;
}
</style>
