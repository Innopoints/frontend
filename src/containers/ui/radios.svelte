<script>
  import RadioGroup from 'ui/radio-group.svelte';
  import Card from 'ui/card.svelte';

  const labels = ['one', 'two', 'three'];
  const values = [1, 2, 3];
  const colors = ['#ff3333', '#33ff33', '#3333ff'];
  let currValue = values[1];
</script>

<Card id="radios">
  <h1>Radio Buttons</h1>
  <div class="showcase">
    <RadioGroup
        name="radio0"
        values={values}
        labels={labels}
        bind:value={currValue}
    />
    <hr />
    <RadioGroup
        name="radio1"
        values={values}
        labelclass="label"
        labelPosition="left"
        bind:value={currValue}
        classname="flex-wrap"
    />
    <hr />
    <RadioGroup
        isColor
        name="radio2"
        values={colors}
        classname="flex-wrap"
    />
  </div>
</Card>
