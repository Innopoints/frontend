<script>
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import Card from 'ui/card.svelte';

  const checkboxes = [
    {
      id: 0,
      color: '#FF00FF',
      label: 'one checkbox',
    },
    {
      id: 1,
      color: '#FFFFFF',
      label: 'two checkbox',
    },
    {
      id: 2,
      color: '#000000',
      label: 'three checkbox',
    },
  ];
</script>

<Card id="checkboxes">
  <h1>Checkboxes</h1>
  <div class="showcase">
    <CheckboxGroup
        items={checkboxes}
        name="checkbox-1"
    />
  </div>
  <div class="showcase">

    <hr />

    <CheckboxGroup
        colored
        items={checkboxes}
        checked={[checkboxes[1]]}
        name="checkbox-2"
    />

    <hr />

    <CheckboxGroup
        labeled
        items={checkboxes}
        checked={checkboxes}
        name="checkbox-3"
    />
  </div>
</Card>
