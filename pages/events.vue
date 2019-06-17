<template>
  <div>
    <EventsTagline />
  </div>
</template>

<script>
  import EventsTagline from '../components/events/tagline';
  export default {
    components: { EventsTagline },
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` }
      ]
    }
  };
</script>
