<script>
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import Card from 'ui/card.svelte';

  const checkboxes0 = ['one', 'two', 'three', 'four'];

  const checkboxes = [
    {
      color: '#FF00FF',
      label: 'one checkbox',
    },
    {
      color: '#FFFFFF',
      label: 'two checkbox',
    },
    {
      color: '#000000',
      label: 'three checkbox',
    },
  ];
</script>

<Card id="checkboxes">
  <h1>Checkboxes</h1>
  <div class="showcase">
    <CheckboxGroup
        items={checkboxes0}
        name="checkbox-1"
    />
  </div>
  <div class="showcase">

    <hr />

    <CheckboxGroup
        colored
        items={checkboxes}
        value={[checkboxes[1]]}
        name="checkbox-2"
    />

    <hr />

    <CheckboxGroup
        labeled
        items={checkboxes}
        value={checkboxes}
        name="checkbox-3"
    />
  </div>
</Card>
