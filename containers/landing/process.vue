<template>
  <section class="process">
    <h2>How to get innopoints?</h2>
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="step"
    >
      <Step v-bind="step" />
    </div>
  </section>
</template>

<script>
  import Vue from 'vue';
  import Step from '../../components/landing/process-step';
  import steps from '../../constants/landing/process';

  export default Vue.extend({
    components: {
      Step,
    },
    data() {
      return {
        steps,
      };
    },
  });
</script>
