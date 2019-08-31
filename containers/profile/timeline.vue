<template>
  <Timeline :class="{collapsed}" load>
    <TimelineEntry icon="/images/icons/file-text.svg">
      Applied for <strong>Requisite Management</strong> on <a href="#">Slippers of the Year 2019</a>
      <div class="status good">application accepted, 3 hours of worktime</div>
      <time>21:13, 21 Jun</time>
    </TimelineEntry>
    <TimelineEntry important icon="/images/icons/file-text.svg">
      Applied for <strong>Requisite Management</strong> on <a href="#">Slippers of the Year 2019</a>
      <div class="status good">application accepted, 3 hours of worktime</div>
      <time>21:13, 21 Jun</time>
    </TimelineEntry>
  </Timeline>
</template>

<script>
  import Dot from '@/components/ui/dot';
  import Timeline from '@/components/profile/timeline';
  import TimelineEntry from '@/components/profile/timeline-entry';
  import Button from '@/components/ui/button';

  export default {
    name: 'ProfileTimeline',
    components: {
      Button,
      TimelineEntry,
      Timeline,
      Dot,
    },
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      collapse() {
        this.collapsed = !this.collapsed;
      },
    },
  };
</script>
