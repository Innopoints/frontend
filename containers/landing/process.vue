<template>
  <section class="options">
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
  import Step from '../../components/landing/process-step';
  import steps from '../../constants/landing/process';

  export default {
    components: {
      Step,
    },
    data() {
      return {
        steps,
      };
    },
  };
</script>
