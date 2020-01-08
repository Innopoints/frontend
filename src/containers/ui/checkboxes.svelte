<script>
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import Card from 'ui/card.svelte';

  let values = [
    { value: 1, checked: false },
    { value: 2, checked: false },
    { value: 3, checked: false },
  ];
  const labels = ['one', 'two', 'three'];
  let colors = [
    { value: '#ff3333', checked: false },
    { value: '#33ff33', checked: false },
    { value: '#3333ff', checked: false },
  ];
</script>

<Card id="checkboxes">
  <h1>Checkboxes</h1>
  <div class="showcase">
    <CheckboxGroup
        name="checkboxes0"
        bind:values={values}
        labels={labels}
    />
    <hr />
    <CheckboxGroup
        name="checkboxes1"
        bind:values={values}
        labelclass="label"
        labelPosition="left"
        classname="flex-wrap"
        maxChecked={2}
    />
    <hr />
    <CheckboxGroup
        name="checkboxes2"
        isColor
        isRound
        bind:values={colors}
        classname="flex-wrap"
    />
  </div>
</Card>
