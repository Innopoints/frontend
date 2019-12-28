<script>
  import Card from 'ui/card.svelte';

  import Chip from 'ui/chip.svelte';
  import ChipGroup from 'ui/chip-group.svelte';

  const chips = [
    'one',
    'two',
    'three',
  ];
</script>

<Card id="chips">
  <h1>Chips</h1>
  <div class="showcase">
    <div style="display: flex; flex-wrap: wrap;">
      <Chip disabled>most first</Chip>
      <Chip disabled>least first</Chip>
      <Chip disabled isOutline>least last</Chip>
      <Chip disabled isOutline>most last</Chip>
    </div>
  </div>

  <hr />
  <ChipGroup items={chips} value={chips[0]} name="chip-11" classname="flex-wrap" />

  <hr />
  <ChipGroup items={chips} value={chips} name="chip-12" multiple classname="flex-wrap" />

  <hr />

  <div class="showcase">
    <div role="group" style="display: flex; flex-wrap: wrap;">
      <Chip name="chip-2" isSmall>XS</Chip>
      <Chip name="chip-2" isSmall value={true}>S</Chip>
      <Chip name="chip-2" isSmall disabled>M</Chip>
      <Chip name="chip-2" isSmall isOutline>L</Chip>
      <Chip name="chip-2" isSmall isOutline>XL</Chip>
    </div>
  </div>

  <hr />

  <div class="showcase">
    <div role="group" style="display: flex; flex-wrap: wrap;">
      <Chip name="chip-2" multiple>most first</Chip>
      <Chip name="chip-2" multiple>least first</Chip>
      <Chip name="chip-2" multiple>least first</Chip>
      <Chip name="chip-2" multiple>most last</Chip>
    </div>
  </div>
</Card>
