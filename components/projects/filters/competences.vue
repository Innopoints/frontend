<template>
  <li class="filter competences panel">
    <LabelIcon class="icon mr" />
    <Accordion label="select competences">
      <Button @click="clearCompetences">clear all</Button>
      <CheckboxGroup
        :value="competences"
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
  import LabelIcon from '@/static/images/icons/label.svg';

  export default {
    name: 'Competences',
    components: {
      Accordion,
      Button,
      CheckboxGroup,
      LabelIcon,
    },
    data() {
      return {
        open: false,
      };
    },
    computed: {
      ...mapState({
        competences: state => state.projects.filters.competences.map(c => ({...c, label: c.name})),
      }),
    },
    methods: {
      ...mapActions('projects', [
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
