<template>
  <div :class="['activities', {'brief padded': !admin}]">
    <BriefActivity v-for="activity in activities" :key="activity.name" v-bind="activity" />
  </div>
</template>

<script>
  import BriefActivity from '@/components/project/activity-brief';

  export default {
    name: 'ProjActivities',
    components: { BriefActivity },
    props: {
      admin: Boolean,
      activities: Array,
    },
  };
</script>
