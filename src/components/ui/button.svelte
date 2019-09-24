<script>
  import { createEventDispatcher } from 'svelte';

  export let label = '';
  export let away = null;
  export let href = '';
  export let chevron = false;
  export let filled = false;
  export let disabled = false;
  export let outline = false;
  export let danger = false;
  export let badge = false;
  export let round = false;
  export let normal = false;

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

{#if href}
  <a {href} target={away && '_blank'} class={classes.join(' ')}>
    <slot />
    {#if away}
      <svg src="images/icons/external-link.svg" class="icon ml" />
    {/if}
  </a>
{:else}
  <button
    type="button"
    {disabled}
    class={classes.join(' ')}
    on:click={() => dispatch('click')}>
    {#if badge}
      <div class="badge">
        <slot>{label}</slot>
      </div>
    {:else}
      <slot>{label}</slot>
    {/if}

    {#if chevron}
      <svg src="images/icons/chevron-down.svg" class="icon ml chevron" />
    {/if}
  </button>
{/if}

<!--<svelte:component
  this={href ? A : Button}
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
    <svg src="images/icons/chevron-down.svg" class="icon ml chevron" />
  {/if}
</svelte:component>-->
