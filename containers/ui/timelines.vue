<template>
  <Card>
    <h1>
      Timeline
    </h1>

    <div class="showcase vertical">
      <Timeline
        :handle-load="handleLoad"
        load
      >
        <TimelineEntry>
          Here are we
        </TimelineEntry>
        <TimelineEntry important>
          Here are we again
        </TimelineEntry>
        <TimelineEntry icon="/images/events/x.svg">
          And again
        </TimelineEntry>
        <TimelineEntry important icon="/images/events/plus-circle.svg">
          Till the end
        </TimelineEntry>
      </Timeline>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Timeline from '../../components/ui/timeline';
  import TimelineEntry from '../../components/ui/timeline-entry';


  export default {
    components: {
      Timeline,
      TimelineEntry,
      Card,
    },
    methods: {
      handleLoad() {
        alert('load more');
      },
    },
  };
</script>
