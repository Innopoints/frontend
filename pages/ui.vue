<template>
  <div class="body-wrap">
    <nav class="ui-navigation">
      <Button link href="#buttons" label="Buttons" />
      <Button link href="#checkboxes" label="Checkboxes" />
      <Button link href="#inputs" label="Inputs" />
      <Button link href="#timeline" label="Timeline" />
      <Button link href="#carousels" label="Carousels" />
      <Button link href="#labeled" label="Labeled" />
    </nav>

    <ButtonsShowcase id="buttons" />
    <CheckboxesShowcase id="checkboxes" />
    <InputsShowcase id="inputs" />
    <ChipsShowcase id="chips" />
    <TimelineShowcase id="timeline" />
    <CarouselsShowcase id="carousels" />
    <LabeledShowcase id="labeled" />
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';
  import CheckboxesShowcase from '../containers/ui/checkboxes';
  import InputsShowcase from '../containers/ui/inputs';
  import TimelineShowcase from '../containers/ui/timelines';
  import ChipsShowcase from '../containers/ui/chips';
  import CarouselsShowcase from '../containers/ui/carousels';
  import LabeledShowcase from '../containers/ui/labeled';
  import Button from '../components/ui/button';

  export default {
    components: {
      Button,
      ButtonsShowcase,
      CheckboxesShowcase,
      InputsShowcase,
      TimelineShowcase,
      ChipsShowcase,
      CarouselsShowcase,
      LabeledShowcase
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
