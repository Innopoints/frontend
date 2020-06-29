<script>
  import { Switch } from 'attractions';

  export let name;
  export let first;
  export let second;
  export let value = first;
  $: value = (boolValue ? second : first);
  export let boolValue = false;
</script>

<div class="two-state-switch">
  <span class="state first" class:selected={!boolValue}>{first}</span>
  <Switch {name} bind:value={boolValue} />
  <span class="state second" class:selected={boolValue}>{second}</span>
</div>

<style src="../../../static/css/components/common/two-state-switch.scss"></style>
