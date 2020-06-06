<script>
  import { Label } from 'attractions';

  export let classname = '';
  export let labelclass = '';

  export let label = '';
  export let icon = false;
</script>

<div class:text={!icon} class="labeled {classname}">
  {#if icon}
    <div />
    <slot name="icon" />
    <Label class={labelclass}>
      <slot name="label">{label}</slot>
    </Label>
    <slot />
  {:else}
    <Label class={labelclass}>
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

    :global(.icon) {
      display: none;
    }

    @supports (display: grid) {
      display: inline-grid;
      grid-template-rows: auto 1fr;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-auto-flow: column;

      :global(.icon) {
        display: block;
        height: 1.5rem;
        width: 1.5rem;
        stroke: $main;
        align-self: start;

        :global(svg) {
          stroke: $main;
        }
      }
    }
  }
</style>
