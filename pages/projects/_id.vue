<template>
  <div class="material">
    <h1 class="padded">{{ proj.title }}</h1>
    <ProjInfo v-bind="proj" />
  </div>
</template>

<script>
  import projects from '@/constants/projects/projects';
  import ProjInfo from '@/components/project/info';

  export default {
    components: { ProjInfo },
    head() {
      return {
        title: this.proj.title,
      };
    },
    asyncData ({ params }) {
      return {
        proj: projects.find(x => x.id === parseInt(params.id)),
      };
    },
  };
</script>

<style lang="scss" src="../../static/css/project-view/index.scss" />
