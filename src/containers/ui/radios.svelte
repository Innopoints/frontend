<script>
  import RadioGroup from 'ui/radio-group.svelte';
  import Card from 'ui/card.svelte';

  const radioItems1 = [
    {
      id: 1,
      label: 'one label',
      color: '#FF0000',
    },
    {
      id: 2,
      label: 'two label',
      color: '#000000',
    },
    {
      id: 3,
      label: 'three label',
      color: '#FFFFFF',
    },
  ];
</script>

<Card id="radios">
  <h1>Radio Buttons</h1>
  <div class="showcase">
    <RadioGroup
        labelClass="radio"
        name="radio0"
        items={radioItems1}
    />
    <hr />

    <RadioGroup
        name="radio1"
        isLabel
        items={radioItems1}
        selected={radioItems1[2]}
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
        labelClass="radio"
        name="radio3"
        items={radioItems1}
    />
  </div>
</Card>
