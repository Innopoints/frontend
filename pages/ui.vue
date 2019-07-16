<template>
  <div class="body-wrap">
    <ButtonsShowcase />
    <CheckboxesShowcase />
    <InputsShowcase />
    <ChipsShowcase />
    <TimelineShowcase />
    <CarouselsShowcase />
    <DialogsShowcase />
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';
  import CheckboxesShowcase from '../containers/ui/checkboxes';
  import InputsShowcase from '../containers/ui/inputs';
  import TimelineShowcase from '../containers/ui/timelines';
  import ChipsShowcase from '../containers/ui/chips';
  import CarouselsShowcase from '../containers/ui/carousels';
  import DialogsShowcase from '../containers/ui/dialogs';

  export default {
    components: {
      ButtonsShowcase,
      CheckboxesShowcase,
      InputsShowcase,
      TimelineShowcase,
      ChipsShowcase,
      CarouselsShowcase,
      DialogsShowcase,
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
