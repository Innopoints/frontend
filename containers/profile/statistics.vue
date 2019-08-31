<template>
  <section class="statistics">
    <div class="period">
      <span class="hide-tb">Showing statistics</span>
      <Dropdown>
        <template v-slot:label>
          over the past 3 months
        </template>
        <span class="label">Period of statistics</span>
        <ul class="mt">
          <li>
            <Button label="last week" />
          </li>
          <li>
            <Button label="last month" />
          </li>
          <li>
            <Button label="last 3 month" />
          </li>
          <li>
            <Button label="last semester" />
          </li>
          <li>
            <Button label="last year" />
          </li>
          <li>
            <Button label="all time" />
          </li>
        </ul>
        <hr data-text="or" />
        <Button label="select date range" img="/images/icons/calendar.svg" />
      </Dropdown>
    </div>

    <Button img="/images/icons/file-text.svg" label="create a volunteer report" />

    <div class="top-stats">
      <div class="stat">
        <header>
          <Clock class="icon" />
          {{ hours }} volunteering hours
        </header>
        <div class="details">15 volunteering positions handled</div>
      </div>
      <div class="stat">
        <header>
          <Star class="icon" />
          Volunteer rating
          <span class="rating">{{ rating }}</span>
        </header>
        <Button label="view feedback">
          view feedback<Dot />
        </Button>
      </div>
    </div>

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
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import Dropdown from '../../components/ui/dropdown';
  import Clock from '../../static/images/icons/clock.svg';
  import Star from '../../static/images/icons/star.svg';
  import Stats from '../../static/images/icons/bar-chart-2.svg';
  import Button from '../../components/ui/button';
  import Dot from '@/components/ui/dot';

  export default {
    name: 'ProfileStatistics',
    components: {
      Dot,
      Button,
      Dropdown,
      Clock,
      Star,
      Stats,
    },
    computed: {
      ...mapState({
        hours: state => state.user.volunteeringHours,
        rating: state => state.user.rating,
      }),
    },
  };
</script>

<style>
  .statistics {
    display: block !important;
  }
</style>
