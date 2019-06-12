<template>
  <section class="features">
    <h2>How does it work?</h2>
    <div
      v-for="(features, i) in features"
      :key="i"
      class="container"
    >
      <FeatureCard v-bind="features" />
    </div>
  </section>
</template>

<script>
  import Vue from 'vue';
  import FeatureCard from '../components/landing/FeatureCard';
  import features from '../constants/features';
  export default Vue.extend({
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