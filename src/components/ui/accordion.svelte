<script>
  import Button from './button.svelte';

  export let label = '';
  export let open = false;
  export const toggle = () => (open = !open);
</script>

<div class="accordion">
  <div class:open class="panel">
    <slot name="label">
      <Button on:click={toggle} chevron>{label}</Button>
    </slot>
  </div>
  <section>
    <slot />
  </section>
</div>
