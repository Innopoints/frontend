<template>
  <ul class="accordion">
    <Spots />

    <li :class="{open: competencesPanel}" class="filter competences panel">
      <LabelIcon class="icon mr" />
      <Button
        @click="toggleCompetences"
        label="select competences"
        class="handle"
        chevron
      />
    </li>
    <section>
      <Button @click="clearCompetences" label="clear all" />
      <CheckboxGroup
        :value="competences"
        @change="changeCompetence"
      />
    </section>

    <li :class="{open: datePanel}" class="filter date-range panel">
      <CalendarIcon class="icon mr" />
      <Button
        @click="toggleDate"
        label="select date range"
        class="handle"
        chevron
      />
    </li>
    <section>
      <DateRange />
    </section>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import CheckboxGroup from '@/components/ui/checkbox-group';
  import DateRange from '@/components/projects/filters/date-range';
  import Spots from '@/components/projects/filters/spots';
  import Button from '@/components/ui/button';
  import LabelIcon from '@/static/images/icons/label.svg';
  import CalendarIcon from '@/static/images/icons/calendar.svg';

  export default {
    name: 'FiltersAccordion',
    components: {
      Spots,
      LabelIcon,
      CalendarIcon,
      Button,
      DateRange,
      CheckboxGroup,
    },
    data() {
      return {
        competencesPanel: false,
        datePanel: false,
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
      toggleCompetences() {
        this.competencesPanel = !this.competencesPanel;
        this.datePanel = false;
      },
      toggleDate() {
        this.datePanel = !this.datePanel;
        this.competencesPanel = false;
      },
    },
  };
</script>
