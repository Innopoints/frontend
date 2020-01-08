<script>
  import Card from 'ui/card.svelte';
  import Switch from 'ui/switch.svelte';
  import TwoStateSwitch from 'ui/two-state-switch.svelte';
</script>

<Card id="switches">
  <h1>Switches</h1>
  <div class="showcase">
    <Switch name="withLabel" label="Prefixing text" />
    <hr />
    <TwoStateSwitch first="First" second="Second" name="twoStated" />
  </div>
</Card>
