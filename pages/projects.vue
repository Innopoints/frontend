<template>
  <div class="material">
    <EventsTagline />

    <section class="projects padded">
      <h1>Ongoing events</h1>

      <Filters />
      <Ordering />

      <div v-if="events.length === 0" class="empty">
        <figure>
          <img class="picture" src="/images/projects/no-projects.svg" alt="" />
          <figcaption>
            <div class="title">No projects found...</div>
            But you can <nuxt-link to="project-edit">create a project</nuxt-link> right now!
          </figcaption>
        </figure>
      </div>

      <div class="cards">
        <Event
          v-for="(event, i) in events"
          :key="i"
          v-bind="event"
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
  import Filters from '../containers/projects/filters';
  import EventsTagline from '../components/projects/tagline';
  import Ordering from '../components/projects/filters/ordering';
  import Button from '../components/ui/button';
  // import Pagination from '../components/pagination';

  export default {
    head: {
      title: 'Event Browser',
      meta: [
        { hid: 'description', name: 'description',
          content: `Search for volunteering opportunities with event browser page` },
      ],
    },
    components: {
      Button,
      // Pagination,
      Ordering,
      Filters,
      EventsTagline,
      Event: () => import('../components/projects/project'),
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
      events() {
        const page = this.currentPage - 1;
        const start = this.projectsPerPage * page;
        const end = start + this.projectsPerPage;
        return this.allProjects.slice(start, end);
      },
    },
  };
</script>

<style lang="scss" src="../static/css/projects/index.scss" />
