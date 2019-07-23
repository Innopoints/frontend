<template>
  <Card id="carousels">
    <h1>Carousels</h1>
    <div class="showcase" style="max-width: 500px; justify-content: space-around;">
      <Carousel
        :images="images"
        :hide-indicators="!indicatorOn"
        :hide-controls="!controlOn"
        :interval="auto ? time : 0"
        style="margin: 1em auto;"
      />
      <hr />
      <Chip v-model="indicatorOn" name="carouselDemo" multiple>show indicators</Chip>
      <Chip v-model="controlOn" name="carouselDemo" multiple>show controls</Chip>
      <Chip v-model="auto" name="carouselDemo" multiple>
        cycle 
        <input
          v-model="amount"
          type="number"
          min="0"
          max="6000"
          step="100"
          style="max-width: 45px;"
        />
        (ms)
      </Chip>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Carousel from '../../components/ui/carousel';
  import Chip from '../../components/ui/chip';

  export default {
    components: {
      Card,
      Carousel,
      Chip,
    },
    data() {
      return {
        images: [
          '/images/ui-kit/umbrella.png',
          '/images/ui-kit/sweatshirt.png',
          '/images/ui-kit/tshirt.png',
        ],
        indicatorOn: true,
        controlOn: true,
        auto: false,
        amount: '1000',
      };
    },
    computed: {
      time() {
        return parseInt(this.amount, 10); 
      },
    },
  };
</script>
