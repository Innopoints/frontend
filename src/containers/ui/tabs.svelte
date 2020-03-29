<script>
  import Tabs from 'ui/tabs.svelte';
  import Card from 'ui/card.svelte';

  const tabs = ['Tab 1', 'Tab 2'];
  const values = ['tab_1', 'tab_2'];
  let value = values[0];
</script>

<Card id="tabs">
  <h1>Tabs</h1>
  <div class="showcase">
    <Tabs items={values} labels={tabs} bind:value={value} name="tabs" />
  </div>
</Card>
