<template>
  <div class="material">
    <ProfileInfo />
    <section class="card">
      <ProfileTabs @change="changeTabs" />
      <ProfileTimeline v-if="activeTab === 'T'" />
      <ProfileStatistics v-else-if="activeTab === 'S'" />
      <ProfileNotifications v-else-if="activeTab === 'N'" />
    </section>
  </div>
</template>

<script>
  import ProfileInfo from '../containers/profile/info';
  import ProfileTimeline from '../containers/profile/timeline';
  import ProfileStatistics from '../containers/profile/statistics';
  import ProfileNotifications from '../containers/profile/notifications';
  import ProfileTabs from '@/containers/profile/tabs';

  export default {
    layout: 'auth',
    components: {
      ProfileTabs,
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
    data() {
      return {
        activeTab: 'T',
      };
    },
    methods: {
      changeTabs(tab) {
        this.activeTab = tab;
      },
    },
  };
</script>

<style lang="scss" src="../static/css/profile/index.scss" />
