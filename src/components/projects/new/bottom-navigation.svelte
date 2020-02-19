<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';

  export let step;
  export let error = null;

  const dispatch = createEventDispatcher();
</script>

<div class="actions padded">
  <p class="error">
    {#if error != null}
      Some required fields are still empty :c
      {#if step === 3}
        <Button classname="ml" href="/projects/new?step={error}">where?</Button>
      {/if}
    {/if}
  </p>
  {#if step > 1}
    <Button href="/projects/new?step={step - 1}" classname="back">
      <svg src="/images/icons/arrow-left.svg" class="icon mr" />
      go back
    </Button>
  {/if}
  {#if step > 0 && step < 3}
    <Button href="/projects/new?step={step + 1}" classname="forward" isFilled>
      <svg src="/images/icons/arrow-right.svg" class="icon mr" />
      next step
    </Button>
  {:else if step === 3}
    <Button isFilled disabled={error != null} on:click={() => dispatch('publish')}>
      create project
    </Button>
  {/if}
</div>
