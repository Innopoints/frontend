<script>
  import Card from 'ui/card.svelte';
  import Switch from 'ui/switch.svelte';
</script>

<Card id="switches">
  <h1>Switches</h1>
  <div class="showcase">
    <Switch name="switch-1" id="switch-1" />
    <Switch value={true} name="switch-2" id="switch-2" />
  </div>

  <hr />
  <div class="showcase">
    <Switch name="withLabel" id="withLabel">Prefixing text</Switch>
  </div>

  <hr />
  <div class="showcase">
    <Switch isTwoState first="First" second="Second" name="twoStated" id="twoStated" />
  </div>
</Card>
