<script>
  import { createEventDispatcher } from 'svelte';
  import rippleEffect from './utils/ripple';

  export let classname = null;
  export let isFilled = false;
  export let isOutline = false;
  export let isDanger = false;
  export let isRound = false;
  export let isNormal = false;
  export let isRectangle = false;
  export let ripple = true;

  export let disabled = false;
  export let label = '';
  export let away = null;
  export let href = '';
  export let chevron = false;
  export let badge = false;

  $: rippleColor = getRippleColor();
  $: classes = [
    isFilled && 'filled',
    isOutline && 'outline',
    isDanger && 'danger',
    isRound && 'round',
    isNormal && 'normal',
    isRectangle && 'rectangle',
    classname ? classname : 'btn',
  ].filter(v => v !== false);

  const getRippleColor = () => {
    if (ripple) {
      if (isFilled) {
        return 'rgba(255, 255, 255, .35)';
      } else {
        if (isDanger) return 'rgba(186, 3, 3, .25)';
        else return 'rgba(56, 120, 0, .25)';
      }
    }
    return null;
  };

  let dispatch = createEventDispatcher();
</script>

{#if href}
  <a
      {href}
      target={away && '_blank'}
      class={classes.join(' ')}
      on:click={() => dispatch('click')}
  >
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
    on:click={() => dispatch('click')}
    use:rippleEffect={rippleColor}
  >
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
