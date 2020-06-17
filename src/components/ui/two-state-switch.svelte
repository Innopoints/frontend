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

<style lang="scss">
  @import "_attractions-theme.scss";

  .two-state-switch {
    display: flex;
    align-items: center;

    :global {
      .track {
        border-color: $main !important;
      }

      .thumb {
        background-color: $main !important;
      }
    }
  }

  .state {
    font-weight: 500;
    margin: 0 .8em;
    color: $off-state;

    &.selected {
      color: $main;
    }
  }
</style>
