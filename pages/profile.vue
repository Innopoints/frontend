<template>
  <div class="material">
    <ProfileInfo />
    <ProfileTimeline />
    <ProfileStatistics />
    <ProfileNotifications />
  </div>
</template>

<script>
  import ProfileInfo from '../containers/profile/info';
  import ProfileTimeline from '../containers/profile/timeline';
  import ProfileStatistics from '../containers/profile/statistics';
  import ProfileNotifications from '../containers/profile/notifications';

  export default {
    components: {
      ProfileNotifications,
      ProfileStatistics,
      ProfileTimeline,
      ProfileInfo,
    },
    head: {
      title: 'Profile',
      meta: [
        { hid: 'description', name: 'description', content: `Your innopoints profile` },
      ],
    },
  };
</script>

<style lang="scss" src="../static/css/profile/index.scss" />

<style scoped>
  .material {
    min-height: 50em;
  }
</style>
