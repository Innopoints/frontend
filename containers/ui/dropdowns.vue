<template>
  <Card>
    <h1>Dropdowns</h1>
    <div class="showcase vertical">
      <Dropdown
        :items="drop1.items"
        :label="drop1.label"
        v-model="drop1.value"
      />

      <Dropdown
        :items="drop2.items"
        :label="drop2.label"
        v-model="drop2.value"
        right
        return-object
      >
        <template v-slot:label>
          <h4>choose a color:</h4>
        </template>
        <template v-slot:item="{ item }">
          <Button>{{ item.text }}&nbsp;<span :style="`color: ${item.value}`">({{ item.value }})</span></Button>
        </template>
      </Dropdown>
    </div>
  </Card>
</template>

<script>
  import Card from '../../components/ui/card';
  import Dropdown from '../../components/ui/dropdown';
  import Button from '../../components/ui/button';

  export default {
    components: {
      Button,
      Dropdown,
      Card,
    },
    data() {
      return {
        drop1: {
          label: 'simple dropdown',
          items: [
            'item 1',
            'item 2',
            'item 3',
          ],
          value: '',
        },
        drop2: {
          label: 'color selector',
          items: [
            {text: 'red',   value: '#FF0000'},
            {text: 'green', value: '#00FF00'},
            {text: 'blue',  value: '#0000FF'},
          ],
          value: {text: 'black', value: '#FFFFFF'},
        },
      };
    },
  };
</script>
