<template>
  <div class="material">
    <h1 class="padded">{{ proj.title }}</h1>
    <ProjInfo v-bind="proj" :admin="admin" />
    <ProjActions v-if="admin" />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import projects from '@/constants/projects/projects';
  import ProjInfo from '@/components/project/info';
  import ProjActions from '@/components/project/actions';

  export default {
    components: {
      ProjActions,
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
