<script>
  import Button from 'ui/button.svelte';

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  export let open = false;
  $: value = open;
</script>

<li class:open={value} class="filter competences panel">
  <svg src="images/icons/tag.svg" class="icon mr" />
  <Button chevron={true} classname="handle" on:click={() => dispatch('toggle')}>
    select competences
  </Button>
</li>
<section>
  <Button>clear all</Button>
</section>
