<template>
  <section class="how-to">
    <h2>How does it work?</h2>
    <div class="container">
      <template v-for="(howTo, i) in howTos">
        <HowToCard v-bind="howTo" :key="howTo.title" />
        <ArrowDown :key="i" v-if="i !== 2" class="arrow" />
      </template>
    </div>
  </section>
</template>

<script>
  import HowToCard from '../../components/home/how-to-card';
  import howTos from '../../constants/home/how-tos';
  import ArrowDown from '../../static/images/icons/arrow-down.svg';

  export default ({
    components: {
      HowToCard,
      ArrowDown,
    },
    data() {
      return {
        howTos,
      };
    },
  });
</script>
