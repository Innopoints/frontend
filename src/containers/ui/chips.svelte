<script>
  import Card from 'ui/card.svelte';

  // import Chip from 'ui/chip.svelte';
  import UnclickableChipGroup from 'ui/unclickable-chip-group.svelte';
  import CheckChipGroup from 'ui/check-chip-group.svelte';
  import RadioChipGroup from 'ui/radio-chip-group.svelte';

  let checkValues = [
    { value: 1, checked: true },
    { value: 2, checked: false, disabled: true },
    { value: 3, checked: false },
  ];
  let radioValues = [1, 2, 3];
  const labels = ['one', 'two', 'three'];
  let selectedValue = radioValues[2];
</script>

<Card id="chips">
  <h1>Chips</h1>
  <UnclickableChipGroup values={['most first', 'least first']} classname="flex-wrap" />
  <hr />
  <UnclickableChipGroup small outline values={['most last', 'least last']} classname="flex-wrap" />
  <hr />
  <CheckChipGroup bind:values={checkValues} labels={labels} name="chip0" classname="flex-wrap" />
  <hr />
  <CheckChipGroup outline bind:values={checkValues} name="chip1" classname="flex-wrap" maxChecked={1} />
  <hr />
  <RadioChipGroup bind:value={selectedValue} values={radioValues} labels={labels} name="chip2" classname="flex-wrap" />
  <hr />
  <RadioChipGroup small bind:value={selectedValue} values={radioValues} name="chip3" classname="flex-wrap" />
</Card>
