<template>
  <div class="stat competences">
    <header>
      <Stats class="icon" />
      Developed competences
    </header>
    <figure>
      <div class="bar-chart">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="bar"
        >
          <nuxt-link
            :to="'/projects?comp=' + stat.id"
            :style="`flex-basis: ${stat.future}%`"
            class="future"
          >
            <div :style="`flex-basis: ${stat.now}%`" class="present" />
          </nuxt-link>
        </div>
      </div>

      <ul class="legend">
        <li
          v-for="stat in stats"
          :key="stat.id"
        >
          <Button
            :label="stat.name"
            :href="'/projects?comp=' + stat.id"
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
  };
</script>
