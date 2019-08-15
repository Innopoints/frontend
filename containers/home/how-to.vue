<template>
  <section class="how-to">
    <h2>How does it work?</h2>
    <div class="container">
      <template v-for="(howTo, i) in howTos">
        <HowToCard v-bind="howTo" :key="i" />
        <!-- TODO: arrow svg icon -->
        <img
          :key="i"
          :src="'/images/icons/arrow-down.svg'"
          v-if="i !== 2"
          class="arrow"
        />
      </template>
    </div>
  </section>
</template>

<script>
  import HowToCard from '../../components/home/how-to-card';
  import howTos from '../../constants/home/how-tos';

  export default ({
    components: {
      HowToCard,
    },
    data() {
      return {
        howTos,
      };
    },
  });
</script>
