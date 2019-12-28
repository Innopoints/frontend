<script>
  import { onMount, onDestroy } from 'svelte';

  export let id = 'popup';
  export let classname = 'card';
  export let openerclass = 'popup-open';

  export let value = false;
  export let time = 5000;
  $: toggleBodyClass(value);

  let snackbar = null;
  onMount(() => document.body.appendChild(snackbar));
  onDestroy(() => document.body.removeChild(snackbar));

  let timeout = null;
  const toggleBodyClass = (val) => {
    if (val) {
      document.body.classList.add(openerclass);
      timeout = setTimeout(() => {
        value = false;
      }, time);
    } else {
      clearTimeout(timeout);
      document.body.classList.remove(openerclass);
    }
  };
</script>

<div {id} class={classname} bind:this={snackbar}>
  <slot />
</div>
