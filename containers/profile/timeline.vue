<template>
  <Timeline :class="{collapsed}" load>
    <TimelineEntry
      :action="{
        date: '21:13, 21 Jun 2019',
        application: {
          name: 'Editing video',
          status: 'A',
          project: {
            name: 'Inno..What?!',
            link: '15',
          },
        },
      }"
      type="V"
    />
    <TimelineEntry
      :action="{
        date: '21:13, 21 Jun 2019',
        project: {
          name: 'Dying party',
          link: '15',
        },
      }"
      type="M"
    />
    <TimelineEntry
      :action="{
        date: '21:13, 21 Jun 2019',
        item: {
          id: 2,
          name: 'ASCII Whale',
          type: 'T-Shirt',
        },
        status: 'W'
      }"
      type="P"
    />
    <TimelineEntry
      :action="{
        date: '21:13, 21 Jun 2019',
        status: 'W',
        project: {
          name: 'Dying party',
          link: '15',
        },
      }"
      type="C"
    />
  </Timeline>
</template>

<script>
  import Timeline from '@/components/profile/timeline';
  import TimelineEntry from '@/components/profile/timeline-entry';

  export default {
    name: 'ProfileTimeline',
    components: {
      TimelineEntry,
      Timeline,
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
