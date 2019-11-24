<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './button.svelte';

  export let classname = 'dropdown-shell';
  export let btnclass = 'handle';
  export let dropdownclass = 'dropdown';
  export let wrapperclass = 'relative-wrapper';
  export let isRight = false;

  export let label = '';
  export let chevron = true;
  export let nowrap = false;
  export let value = false;

  $: isOpen = value;
  let justOpened = false;
  const dispatch = createEventDispatcher();
  const toggle = () => {
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
        dispatch('change', isOpen);
      }
    }
  };

</script>

<svelte:window on:click={clickOutside} />
<div class:open={isOpen} class={classname}>
  <Button on:click={toggle} classname={btnclass}>
    <slot name="label">{label}</slot>
    {#if chevron}
      <svg src="images/icons/chevron-down.svg" class="icon ml chevron" />
    {/if}
  </Button>
  <div class:right-edge={isRight} class={dropdownclass} bind:this={dropNode}>
    {#if nowrap}
      <slot />
    {:else}
      <div class={wrapperclass}>
        <Button on:click={toggle} normal round classname="close">
          <svg src="images/icons/x.svg" />
        </Button>
        <slot />
      </div>
    {/if}
  </div>
</div>
