<template>
  <section class="statistics padded">
    <header>
      <h2 class="btn-align">Statistics</h2>
      <Dropdown class="btn-shift">
        <template v-slot:label>
          over the past 3 months
        </template>
        <template>
          When you see it, run!
        </template>
      </Dropdown>
    </header>

    <div>
      <div class="top-cards">
        <Card class="volunteering">
          <header>
            <Clock />
            325 volunteering hours
          </header>
          <div class="details">15 volunteering positions handled</div>
          <div class="actions">
            <Button label="export volunteering data" />
          </div>
        </Card>
        <Card class="rating">
          <header>
            <Rating />
            Volunteer rating
          </header>
          <div class="content">
            <Star class="star" />
            <Star class="star" />
            <Star class="star" />
            <Star class="star" />
            <Star class="star" />
          </div>
          <div class="details">average rating of 15 people</div>
        </Card>
      </div>

      <Card class="competences">
        <header>
          <Stats />
          Developed competences
        </header>
        <div class="details">
          click a competence to find opportunities for development
        </div>
        <div class="bar-chart" />
        <ul class="legend">
          <li><Button label="proactivity" /></li>
          <li><Button label="critical thinking" /></li>
          <li><Button label="communication" /></li>
        </ul>
      </Card>
    </div>
  </section>
</template>

<script>
  import Dropdown from '../../components/ui/dropdown';
  import Card from '../../components/ui/card';
  import Clock from '../../static/images/profile/clock.svg';
  import Rating from '../../static/images/profile/thumbs-up.svg';
  import Star from '../../static/images/profile/heart.svg';
  import Stats from '../../static/images/profile/statistics.svg';
  import Button from '../../components/ui/button';

  export default {
    name: 'ProfileStatistics',
    components: {
      Button,
      Card,
      Dropdown,
      Clock,
      Rating,
      Star,
      Stats,
    },
  };
</script>
