<template>
  <div class="material">
    <ProfileInfo :user="user" />
  </div>
</template>

<script>
  import user from '../constants/user';
  import ProfileInfo from '../containers/profile/Info';

  export default {
    components: { ProfileInfo },
    head: {
      title: 'Profile',
      meta: [
        { hid: 'description', name: 'description', content: `Your innopoints profile` },
      ],
    },
    data() {
      return {
        user,
      };
    },
  };
</script>

<style lang="scss" src="../static/css/profile/index.scss" />

<style scoped>
  .material {
    min-height: 50em;
  }
</style>
