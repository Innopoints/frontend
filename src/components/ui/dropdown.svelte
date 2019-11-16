<script>
  import Button from './button.svelte';

  export let label = '';
  export let right = false;
  export let chevron = true;
  export let btnclass = '';
  export let dropdownclass = '';
  export let wrapperclass = '';
  export let nowrap = false;
  export let open = false;
  export const customLabel = false;
  export const toggle = () => (open = !open);
</script>

<div class:open class="dropdown-shell">
  <Button on:click={toggle} classname="handle {btnclass}">
    <slot name="label">{label}</slot>
    {#if chevron}
      <svg src="images/icons/chevron-down.svg" class="icon ml chevron" />
    {/if}
  </Button>
  <div class:right-edge={right} class="dropdown {dropdownclass}">
    {#if nowrap}
      <slot />
    {:else}
      <div class="relative-wrapper {wrapperclass}">
        <Button on:click={toggle} normal round classname="close">
          <svg src="images/icons/x.svg" />
        </Button>
        <slot />
      </div>
    {/if}
  </div>
</div>
