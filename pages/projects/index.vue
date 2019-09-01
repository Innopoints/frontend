<template>
  <div class="material">
    <ProjectsTagline />

    <section class="projects padded">
      <h1>Ongoing projects</h1>

      <Filters />
      <Ordering />

      <div v-if="projects.length === 0" class="empty">
        <figure>
          <img class="picture" src="/images/projects/no-projects.svg" alt="" />
          <figcaption>
            <div class="title">No projects found...</div>
            But you can <nuxt-link to="project-edit">create a project</nuxt-link> right now!
          </figcaption>
        </figure>
      </div>

      <div class="cards">
        <Project
          v-for="(project, i) in projects"
          :key="i"
          v-bind="project"
        />
      </div>
    </section>

    <div class="justify-center">
      <Button img="/images/icons/book-open.svg" label="see past projects" />
    </div>

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The <nuxt-link to="/store">InnoStore</nuxt-link> has your answers!
    </p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Filters from '@/containers/projects/filters';
  import ProjectsTagline from '@/components/projects/tagline';
  import Ordering from '@/components/projects/filters/ordering';
  import Button from '@/components/ui/button';

  export default {
    head: {
      title: 'Project Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with project browser page` },
      ],
    },
    components: {
      Button,
      Ordering,
      Filters,
      ProjectsTagline,
      Project: () => import('../../components/projects/project'),
    },
    data() {
      return {
        projectsPerPage: 8,
        currentPage: 1,
      };
    },
    computed: {
      ...mapGetters({
        allProjects: 'projects/projects',
      }),
      pageCount() {
        return Math.ceil(this.allProjects.length / this.projectsPerPage);
      },
      projects() {
        const page = this.currentPage - 1;
        const start = this.projectsPerPage * page;
        const end = start + this.projectsPerPage;
        return this.allProjects.slice(start, end);
      },
    },
  };
</script>

<style lang="scss" src="../../static/css/projects/index.scss" />
