<template>
  <Card class="checkboxes">
    <h1>Checkboxes group</h1>
    <div class="showcase">
      <CheckboxGroup :items="items" :click="handleCheckboxChange" />
    </div>

    <hr />

    <h1>Single switch</h1>
    <div class="showcase vertical">
      <Toggle
        :checked="switch1"
        :click="handleSwitch"
        name="switch1"
        label="Some switch"
      />
      <Toggle
        :checked="switch2"
        :click="handleSwitch"
        name="switch2"
        label="Some another switch"
      />
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import CheckboxGroup from '../../components/ui/checkbox-group';
  import Toggle from '../../components/ui/toggle';

  const items = [
    {
      checked: true,
      label: 'checkbox #1'
    },
    {
      checked: false,
      label: 'checkbox #2'
    },
    {
      checked: true,
      label: 'checkbox #3'
    },
  ];

  export default {
    components: {
      Toggle,
      CheckboxGroup,
      Card
    },
    data() {
      return {
        items,
        switch1: false,
        switch2: true,
      };
    },
    methods: {
      handleCheckboxChange(newItems) {
        this.items = newItems;
      },
      handleSwitch(e) {
        this[e.target.name] = !this[e.target.name];
      }
    }
  };
</script>
