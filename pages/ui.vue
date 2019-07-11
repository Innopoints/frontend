<template>
  <div class="body-wrap">
    <ButtonsShowcase />
    <CheckboxesShowcase />
    <InputsShowcase />
  </div>
</template>

<script>
  import ButtonsShowcase from '../containers/ui/buttons';
  import CheckboxesShowcase from '../containers/ui/checkboxes';
  import InputsShowcase from '../containers/ui/inputs';

  export default {
    components: {
      ButtonsShowcase,
      CheckboxesShowcase,
      InputsShowcase
    },
    head: {
      title: 'UI kit',
      meta: [
        { hid: 'description', name: 'description', content: `UI kit for innopoints project` }
      ]
    },
  };
</script>

<style src="../static/css/ui-page.css" />
