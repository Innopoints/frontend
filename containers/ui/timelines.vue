<template>
  <Card>
    <h1>
      Timeline
    </h1>

    <div class="showcase vertical">
      <Timeline
        :items="items"
        :handle-load="handleLoad"
        load
      />
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Timeline from '../../components/ui/timeline';

  const items = [
    {},
    {
      content: 'Some content here. This is just a long story'
    },
    {
      important: true,
      content: 'Important! Listen to my story about the innopoints project. Long-long time ago...'
    },
    {
      content: 'Simple new icon',
      icon: '/images/events/x.svg'
    },
    {
      important: true,
      content: 'Full timeline object',
      icon: '/images/events/plus-circle.svg'
    }
  ];

  export default {
    components: {
      Timeline,
      Card
    },
    data() {
      return {
        items
      };
    },
    methods: {
      handleLoad() {
        alert('load more');
      }
    }
  };
</script>
