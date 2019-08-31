<template>
  <div class="stat competences">
    <header>
      <Stats class="icon" />
      Developed competences
    </header>
    <figure>
      <div class="bar-chart" />
      <ul class="legend">
        <li
          v-for="stat in stats"
          :key="stat.id"
        >
          <Button
            @click="goTo(stat.id)"
            :label="stat.name"
            href="/projects"
            link
          >
            <div :style="'background: ' + stat.color" class="icon" />
            {{ stat.name }}
          </Button>
        </li>
        <p>click a competence to find opportunities for development</p>
      </ul>
    </figure>
  </div>
</template>

<script>
  import Button from '@/components/ui/button';
  import Stats from '../../static/images/icons/bar-chart-2.svg';
  import stats from '@/constants/profile/stats-competences';

  export default {
    name: 'CompetencesStats',
    components: { Button, Stats },
    data() {
      return {
        stats,
      };
    },
    methods: {
      goTo(id) {
        console.log(id);
      },
    },
  };
</script>
