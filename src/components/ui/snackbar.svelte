<script>
  import { fly } from 'svelte/transition';
  import dynamic from 'ui/utils/dynamic-transition.js';

  export let classname = '';
  export let isOpen = false;
  export let timeout = 5000;
  export let transition = fly;
  export let transitionOptions = { x: -20, duration: 150 };
  let timeoutInstance = null;

  export function open() {
    isOpen = true;
    if (timeoutInstance != null) {
      clearTimeout(timeoutInstance);
    }
    timeoutInstance = setTimeout(() => { isOpen = false; }, timeout);
  }

  export function close() {
    isOpen = false;
    if (timeoutInstance != null) {
      clearTimeout(timeoutInstance);
      timeoutInstance = null;
    }
  }
</script>

{#if isOpen}
  <div
    class="snackbar open {classname}"
    transition:dynamic={{ transition, options: transitionOptions }}
  >
    <slot />
  </div>
{/if}
