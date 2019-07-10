<template>
  <card>
    <h1>Single checkbox</h1>
    <checkbox
      :checked="check1"
      :click="handleCheckbox"
      name="check1"
    /> <br />
    <checkbox
      :checked="check2"
      :click="handleCheckbox"
      name="check2"
      label="with label"
    />
    <hr />

    <h1>Group of checkboxes</h1>
  </card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Checkbox from '../../components/ui/checkbox';

  export default {
    components: {
      Checkbox,
      Card
    },
    data() {
      return {
        check1: true,
        check2: false,
      };
    },
    methods: {
      handleCheckbox(e) {
        this[e.target.name] = !this[e.target.name];
      }
    }
  };
</script>
