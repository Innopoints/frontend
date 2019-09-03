<template>
  <Card class="checkboxes">
    <h1>Checkboxes group</h1>
    <div class="showcase">
      <CheckboxGroup :value="items" :click="handleCheckboxChange" />
    </div>

    <hr />

    <h1>Radio group</h1>

    <div class="showcase">
      <RadioGroup
        :items="items"
        with-labels
        name="radio2"
      />
    </div>

    <hr />

    <h1>Toggles</h1>
    <div class="showcase vertical">
      <Toggle
        :checked="switch1"
        :click="handleSwitch"
        name="switch1"
        label="Some toggle"
      />
      <Toggle
        :checked="switch2"
        :click="handleSwitch"
        name="switch2"
        label="Some another toggle"
      />
      <Toggle
        :checked="switch3"
        :click="handleSwitch"
        name="switch3"
        two-state
        first="state one"
        second="state two"
      />
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import CheckboxGroup from '../../components/ui/checkbox-group';
  import Toggle from '../../components/ui/toggle';
  import RadioGroup from '../../components/ui/radio-group';

  const items = [
    {
      label: 'checkbox #1',
      color: 'orange',
    },
    {
      label: 'checkbox #2',
      color: 'pink',
    },
    {
      label: 'checkbox #3',
      color: 'violet',
    },
  ];

  export default {
    components: {
      RadioGroup,
      Toggle,
      CheckboxGroup,
      Card,
    },
    data() {
      return {
        items,
        switch1: false,
        switch2: true,
        switch3: false,
      };
    },
    methods: {
      handleCheckboxChange(newItems) {
        this.items = newItems;
      },
      handleSwitch(e) {
        this[e.target.name] = !this[e.target.name];
      },
    },
  };
</script>
