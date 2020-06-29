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

<style src="../../../static/css/components/common/labeled.scss"></style>
