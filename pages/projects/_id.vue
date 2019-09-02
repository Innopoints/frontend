<template>
  <div class="material">
    <ProjInfo v-bind="proj" :admin="admin" />
    <h2 class="padded">Activities</h2>
    <ProjActivities :activities="proj.activities" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import projects from '@/constants/projects/projects';
  import ProjInfo from '@/containers/project/info';
  import ProjActivities from '@/containers/project/activities';

  export default {
    components: {
      ProjActivities,
      ProjInfo,
    },
    head() {
      return {
        title: this.proj.title,
      };
    },
    computed: {
      ...mapState({
        isAuth: state => state.user.isAuth,
        isAdmin: state => state.user.isAdmin,
      }),
      admin() {
        return this.isAuth && this.isAdmin;
      },
    },
    asyncData ({ params }) {
      return {
        proj: projects.find(x => x.id === parseInt(params.id)),
      };
    },
  };
</script>

<style lang="scss" src="../../static/css/project-view/index.scss" />
