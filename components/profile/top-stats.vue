<template>
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
</template>

<script>
  import {mapState} from 'vuex';
  import Clock from '../../static/images/icons/clock.svg';
  import Star from '../../static/images/icons/star.svg';
  import Button from '../../components/ui/button';
  import Dot from '@/components/ui/dot';

  export default {
    name: 'TopStats',
    components: {
      Dot,
      Button,
      Clock,
      Star,
    },
    computed: {
      ...mapState({
        hours: state => state.user.volunteeringHours,
        rating: state => state.user.rating,
      }),
    },
  };
</script>
