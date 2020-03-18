<script>
  import Card from 'ui/card.svelte';

  import UnclickableChip from 'ui/unclickable-chip.svelte';
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
  <div role="group" class="flex-wrap">
    {#each ['most first', 'least first'] as value (value)}
      <UnclickableChip {value} />
    {/each}
  </div>
  <hr />
  <div role="group" class="flex-wrap">
    {#each ['most last', 'least last'] as value (value)}
      <UnclickableChip {value} small outline />
    {/each}
  </div>
  <hr />
  <CheckChipGroup bind:values={checkValues} labels={labels} name="chip0" classname="flex-wrap" />
  <hr />
  <CheckChipGroup outline bind:values={checkValues} name="chip1" classname="flex-wrap" maxChecked={1} />
  <hr />
  <RadioChipGroup bind:value={selectedValue} items={radioValues} labels={labels} name="chip2" classname="flex-wrap" />
  <hr />
  <RadioChipGroup small bind:value={selectedValue} items={radioValues} name="chip3" classname="flex-wrap" />
</Card>
