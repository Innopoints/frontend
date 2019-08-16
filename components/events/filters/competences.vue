<template>
  <li class="filter competences panel">
    <img src="/images/events/label.svg" />
    <Accordion label="select competencies">
      <Button @click="clearCompetences">clear all</Button>
      <CheckboxGroup
        :items="competences"
        @change="changeCompetence"
      />
    </Accordion>
  </li>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Accordion from '@/components/ui/accordion';
  import Button from '@/components/ui/button';
  import CheckboxGroup from '@/components/ui/checkbox-group';

  export default {
    name: 'Competences',
    components: {
      Accordion,
      Button,
      CheckboxGroup,
    },
    data() {
      return {
        open: false,
      };
    },
    computed: {
      ...mapState({
        competences: state => state.events.filters.competences.map(c => ({...c, label: c.name})),
      }),
    },
    methods: {
      ...mapActions('events', [
        'changeCompetence',
        'clearCompetences',
      ]),
    },
  };
</script>

<style scoped>
  label {
    cursor: pointer;
  }
</style>
