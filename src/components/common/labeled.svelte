<script>
  import { Label } from 'attractions';
  import classes from '@/utils/classes.js';

  let _class = null;
  export { _class as class };

  export let label;
  export let icon = false;
</script>

<div class:text={!icon} class={classes('labeled', _class)}>
  {#if icon}
    <div />
    <slot name="icon" />
    <Label>
      <slot name="label">{label}</slot>
    </Label>
    <slot />
  {:else}
    <Label>
      <slot name="label">{label}</slot>
    </Label>
    <slot />
  {/if}
</div>

<style lang="scss">
  @import "_attractions-theme.scss";

  .labeled {
    display: flex;

    &.text {
      flex-direction: column;
    }

    :global {
      .icon {
        display: none;
      }

      @supports (display: grid) {
        display: inline-grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
        align-items: center;
        grid-auto-flow: column;

        .icon {
          display: block;
          height: 1.5rem;
          width: 1.5rem;
          stroke: $main;
          align-self: start;

          svg {
            stroke: $main;
          }
        }
      }
    }
  }
</style>
