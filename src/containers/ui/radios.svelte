<script>
  import RadioGroup from 'ui/radio-group.svelte';
  import Card from 'ui/card.svelte';

  const radioItems0 = ['one', 'two', 'three', 'four'];
  const radioItems1 = [
    {
      label: 'one label',
      color: '#FF0000',
    },
    {
      label: 'two label',
      color: '#000000',
    },
    {
      label: 'three label',
      color: '#FFFFFF',
    },
  ];
</script>

<Card id="radios">
  <h1>Radio Buttons</h1>
  <div class="showcase">
    <RadioGroup
        labelclass="radio"
        name="radio0"
        items={radioItems0}
    />
    <hr />

    <RadioGroup
        name="radio1"
        isLabel
        items={radioItems1}
        value={radioItems1[2]}
    />
    <hr />

    <RadioGroup
        classname="switches"
        name="radio2"
        labelPosition="left"
        isLabel
        isLabelGreen
        items={radioItems1}
    />
    <hr />

    <RadioGroup
        isColor
        labelclass="radio"
        name="radio3"
        items={radioItems1}
        value={radioItems1[0]}
    />
  </div>
</Card>
