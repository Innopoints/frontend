<template>
  <Timeline :class="{collapsed}" load>
    <TimelineEntry
      v-for="(action, i) in timeline"
      :key="i"
      :type="action.type"
      :action="action.action"
      :important="action.important || false"
    />
  </Timeline>
</template>

<script>
  import Timeline from '@/components/profile/timeline';
  import TimelineEntry from '@/components/profile/timeline-entry';
  import timeline from '@/constants/profile/timeline';

  export default {
    name: 'ProfileTimeline',
    components: {
      TimelineEntry,
      Timeline,
    },
    data() {
      return {
        collapsed: false,
        timeline,
      };
    },
    methods: {
      collapse() {
        this.collapsed = !this.collapsed;
      },
    },
  };
</script>
