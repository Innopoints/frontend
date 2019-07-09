<template>
  <div :class="open && 'open'" class="dropdown-shell">
    <div @click="toggleDropdown" class="filter competences">
      <span class="competences-title drop-text-open">competences</span>
      <img src="/images/events/chevron-down.svg" class="dropdown-chevron" />
    </div>
    <div class="dropdown shadow-2 right-edge">
      <div class="space-between center">
        <button @click="clearCompetences">clear all</button>
        <img
          @click="toggleDropdown"
          src="/images/events/x.svg"
          sizes="(min-width: 640px) 24px, 18px"
          class="drop-close"
        />
      </div>
      <fieldset>
        <label v-for="competence in competences" :key="competence.name">
          <input @change="changeCompetence(competence)" :checked="competence.checked" type="checkbox" />
          <div class="styled-checkbox" />
          {{ competence.name }}
        </label>
      </fieldset>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'Competences',
    data() {
      return {
        open: false
      };
    },
    computed: {
      ...mapState({
        competences: state => state.events.filters.competences
      })
    },
    methods: {
      ...mapActions({
        changeCompetence: 'events/changeCompetence',
        clearCompetences: 'events/clearCompetences'
      }),
      toggleDropdown() {
        this.open = !this.open;
      }
    }
  };
</script>

<style scoped>
  label {
    cursor: pointer;
  }
</style>
