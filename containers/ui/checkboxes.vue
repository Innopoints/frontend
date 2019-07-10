<template>
  <card class="checkboxes">
    <h1>Checkboxes group</h1>
    <div class="showcase">
      <checkbox-group :items="items" :click="handleCheckboxChange" />
    </div>
  </card>
</template>

<script>
  import Card from '../../components/ui/card';
  import CheckboxGroup from '../../components/ui/checkbox-group';

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
      CheckboxGroup,
      Card
    },
    data() {
      return {
        items
      };
    },
    methods: {
      handleCheckboxChange(newItems) {
        this.items = newItems;
      }
    }
  };
</script>
