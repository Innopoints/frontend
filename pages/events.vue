<template>
  <div>
    <EventsTagline />
    <Events />
  </div>
</template>

<script>
  import EventsTagline from '../components/events/tagline';
  import Events from '../containers/events/events';
  export default {
    components: { 
      EventsTagline,
      Events,
    },
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` }
      ]
    }
  };
</script>
