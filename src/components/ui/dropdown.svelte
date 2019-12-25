<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';

  export let classname = 'dropdown-shell';
  export let btnclass = 'handle btn';
  export let dropdownclass = 'dropdown';
  export let wrapperclass = 'relative-wrapper';
  export let isRight = false;

  export let label = '';
  export let chevron = true;
  export let nowrap = false;
  export let noclose = false;
  export let value = false;

  $: isOpen = value;
  let justOpened = false;
  const dispatch = createEventDispatcher();
  const toggle = () => {
    value = !isOpen;
    isOpen = !isOpen;
    dispatch('change', isOpen);
    if (isOpen) justOpened = true;
  };

  let dropNode = null;
  const clickOutside = (event) => {
    let isClickInside = dropNode.contains(event.target);
    if (!isClickInside) {
      if (justOpened) justOpened = false;
      else if (isOpen) {
        isOpen = false;
        value = false;
        dispatch('change', isOpen);
      }
    }
  };

</script>

<svelte:window on:click={clickOutside} />
<div class:open={isOpen} class={classname}>
  <slot name="handle">
    <Button ripple={false} on:click={toggle} classname={btnclass}>
      <slot name="label">{label}</slot>
      {#if chevron}
        <svg src="images/icons/chevron-down.svg" class="icon ml chevron" />
      {/if}
    </Button>
  </slot>
  <div class:right-edge={isRight} class={dropdownclass} bind:this={dropNode}>
    {#if nowrap}
      <slot />
    {:else}
      <div class={wrapperclass}>
        {#if !noclose}
          <Button on:click={toggle} isNormal isRound classname="close btn">
            <svg src="images/icons/x.svg" />
          </Button>
        {/if}
        <slot />
      </div>
    {/if}
  </div>
</div>
