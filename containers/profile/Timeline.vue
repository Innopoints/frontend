<template>
  <Timeline :class="{'collapsed': !expand}" load class="padded">
    <header>
      <h2>Timeline<Dot attention small /></h2>
      <button id="collapse-timeline" @click="expand = !expand" class="btn">
        <img src="/images/profile/chevron-down.svg" class="icon mr chevron" />
        <span>{{ expand ? 'collapse' : 'expand' }}</span>
      </button>
    </header>

    <TimelineEntry icon="/images/profile/document.svg">
      Applied for <strong>Requisite Management</strong> on <a href="#">Slippers of the Year 2019</a>
      <div class="status good">application accepted, 3 hours of worktime</div>
      <time>21:13, 21 Jun</time>
    </TimelineEntry>
    <TimelineEntry important icon="/images/profile/document.svg">
      Applied for <strong>Requisite Management</strong> on <a href="#">Slippers of the Year 2019</a>
      <div class="status good">application accepted, 3 hours of worktime</div>
      <time>21:13, 21 Jun</time>
    </TimelineEntry>
  </Timeline>
</template>

<script>
  import Dot from '../../components/ui/dot';
  import Timeline from '../../components/ui/timeline';
  import TimelineEntry from '../../components/ui/timeline-entry';

  export default {
    name: 'ProfileTimeline',
    components: {
      TimelineEntry,
      Timeline,
      Dot,
    },
    data() {
      return {
        expand: true,
      };
    },
  };
</script>
