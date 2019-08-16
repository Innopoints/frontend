<template>
  <section class="options">
    <h2>How to get innopoints?</h2>
    <div
      v-for="(option, i) in options"
      :key="i"
      class="step"
    >
      <Step v-bind="option" />
    </div>
  </section>
</template>

<script>
  import Step from '../../components/home/option-step';
  import options from '../../constants/home/options';

  export default {
    components: {
      Step,
    },
    data() {
      return {
        options,
      };
    },
  };
</script>
