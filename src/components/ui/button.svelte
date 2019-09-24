<script>
  import { createEventDispatcher } from 'svelte';

  import A from './html/a.svelte';
  import Button from './html/button.svelte';
  export let label;
  export let away;
  export let href;
  export let chevron;
  export let filled;
  export let disabled;
  export let outline;
  export let danger;
  export let badge;
  export let round;
  export let normal;

  $: ripple = filled
    ? 'rgba(255, 255, 255, .35)'
    : danger
    ? 'rgba(186, 3, 3, .25)'
    : 'rgba(56, 120, 0, .25)';
  $: classes = [
    'btn',
    filled && 'filled',
    outline && 'outline',
    danger && 'danger',
    round && 'round',
    normal && 'normal',
  ];

  let dispatch = createEventDispatcher();
</script>

<svelte:component
  this={href ? A : Button}
  v-ripple={ripple}
  class={classes.join(' ')}
  {href}
  to={href}
  target={href && away ? '_blank' : ''}
  disabled={!href && disabled}
  type={!href ? 'button' : ''}
  on:click={() => dispatch('click')}>
  {#if badge}
    <div class="badge">
      <slot>{label}</slot>
    </div>
  {:else}
    <slot>{label}</slot>
  {/if}

  {#if chevron}
    <svg
      src="../../../static/images/icons/chevron-down.svg"
      class="icon ml chevron" />
  {/if}
</svelte:component>
