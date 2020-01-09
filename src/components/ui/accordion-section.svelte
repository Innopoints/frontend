<script>
  import Button from './button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let classname = '';

  export let label = '';
  export let open = false;

  const dispatch = createEventDispatcher();

  function close() {
    open = false;
  }

  function toggle() {
    if (!open) {
      dispatch('panel-open', { closeCallback: close });
    }
    open = !open;
  }
</script>


<li class:open class="panel {classname}">
  <slot name="handle">
    <Button on:click={toggle} chevron>{label}</Button>
  </slot>
</li>
<section>
  <slot />
</section>
