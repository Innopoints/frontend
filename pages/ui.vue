<template>
  <div class="material">
    <div class="body-wrap">
      <nav class="ui-navigation">
        <Button link href="#buttons" label="Buttons" />
        <Button link href="#checkboxes" label="Checkboxes" />
        <Button link href="#inputs" label="Inputs" />
        <Button link href="#carousels" label="Carousels" />
        <Button link href="#labeled" label="Labeled" />
        <Button link href="#dropdowns" label="Dropdowns" />
        <Button link href="#typography" label="Typography" />
        <Button link href="#dialogs" label="Dialogs" />
      </nav>

      <ButtonsShowcase id="buttons" />
      <CheckboxesShowcase id="checkboxes" />
      <InputsShowcase id="inputs" />
      <ChipsShowcase id="chips" />
      <CarouselsShowcase id="carousels" />
      <LabeledShowcase id="labeled" />
      <DropdownsShowcase id="dropdowns" />
      <TypographyShowcase id="typography" />
      <DialogsShowcase id="dialogs" />
    </div>
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';
  import CheckboxesShowcase from '../containers/ui/checkboxes';
  import InputsShowcase from '../containers/ui/inputs';
  import ChipsShowcase from '../containers/ui/chips';
  import CarouselsShowcase from '../containers/ui/carousels';
  import DialogsShowcase from '../containers/ui/dialogs';
  import LabeledShowcase from '../containers/ui/labeled';
  import DropdownsShowcase from '../containers/ui/dropdowns';
  import TypographyShowcase from '../containers/ui/typography';
  import Button from '../components/ui/button';

  export default {
    components: {
      Button,
      ButtonsShowcase,
      CheckboxesShowcase,
      InputsShowcase,
      ChipsShowcase,
      CarouselsShowcase,
      DialogsShowcase,
      LabeledShowcase,
      DropdownsShowcase,
      TypographyShowcase,
    },
    head: {
      title: 'UI Kit',
      meta: [
        { hid: 'description', name: 'description', content: `UI kit for innopoints project` },
      ],
    },
  };
</script>

<style lang="scss" src="../static/css/ui-page.scss" />
