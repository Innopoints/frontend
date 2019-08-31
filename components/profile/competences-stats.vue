<template>
  <div class="stat competences">
    <header>
      <Stats class="icon" />
      Developed competences
    </header>
    <figure>
      <div class="bar-chart" />
      <ul class="legend">
        <li>
          <Button link href="#" label="proactivity">
            <div class="icon" style="background: rgb(237, 137, 137);" />
            proactivity
          </Button>
        </li>
      </ul>
    </figure>
  </div>
</template>

<script>
  import Button from '@/components/ui/button';
  import Stats from '../../static/images/icons/bar-chart-2.svg';

  export default {
    name: 'CompetencesStats',
    components: { Button, Stats },
  };
</script>
