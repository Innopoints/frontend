<template>
  <div class="body-wrap">
    <ButtonsShowcase />
    <CheckboxesShowcase />
    <InputsShowcase />
    <TimelineShowcase />
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';
  import CheckboxesShowcase from '../containers/ui/checkboxes';
  import InputsShowcase from '../containers/ui/inputs';
  import TimelineShowcase from '../containers/ui/timelines';

  export default {
    components: {
      ButtonsShowcase,
      CheckboxesShowcase,
      InputsShowcase,
      TimelineShowcase
    },
    head: {
      title: 'UI Kit',
      meta: [
        { hid: 'description', name: 'description', content: `UI kit for innopoints project` }
      ]
    },
  };
</script>

<style src="../static/css/ui-page.css" />
