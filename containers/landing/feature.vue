<template>
  <section class="how-to">
    <h2>How does it work?</h2>
    <div class="container">
      <template v-for="(feature, i) in features">
        <FeatureCard v-bind="feature" :key="i" />
        <img
          :key="i"
          :src="'/images/landing/arrow.svg'"
          v-if="i !== 2"
          class="arrow"
        />
      </template>
    </div>
  </section>
</template>

<script>
  import FeatureCard from '../../components/landing/feature-card';
  import features from '../../constants/landing/features';

  export default ({
    components: {
      FeatureCard,
    },
    data() {
      return {
        features,
      };
    },
  });
</script>
