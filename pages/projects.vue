<template>
  <div class="material">
    <EventsTagline />

    <section class="projects padded">
      <h1>Ongoing projects</h1>

      <!--<Filters />
      <Ordering />-->

      <div class="cards">
        <Project
          v-for="(project, i) in projects"
          :key="i"
          v-bind="project"
        />
      </div>
    </section>

    <div class="justify-center">
      <Button img="/images/icons/book-open.svg" label="see past events" />
    </div>

    <!--<Pagination v-if="pageCount > 1" :page-count="pageCount" v-model="currentPage" />-->

    <p class="link-bottom padded">
      What’s so cool about being a volunteer? The <nuxt-link to="/store">InnoStore</nuxt-link> has your answers!
    </p>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import EventsTagline from '../components/projects/tagline';
  import Button from '../components/ui/button';
  // import Filters from '../containers/projects/filters';
  // import Ordering from '../components/projects/filters/ordering';
  // import Pagination from '../components/pagination';

  export default {
    head: {
      title: 'Project Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` },
      ],
    },
    components: {
      Button,
      // Pagination,
      // Ordering,
      // Filters,
      EventsTagline,
      Project: () => import('../components/projects/project'),
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

<style lang="scss" src="../static/css/projects/index.scss" />
