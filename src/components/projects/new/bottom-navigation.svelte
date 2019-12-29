<script>
  import Button from 'ui/button.svelte';
  import {step, errors, findErrors, endProject} from '@/store/new-project';
</script>

<div class="actions">
  {#if $errors.length}
    <p class="error">
      Some required fields are still empty :c
      {#if $step === 3}
        <Button classname="btn ml" on:click={findErrors}>where?</Button>
      {/if}
    </p>
  {/if}
  {#if $step > 1}
    <Button href="/projects/new?step={$step - 1}" classname="btn back">
      <svg src="/images/icons/arrow-left.svg" class="icon mr" />
      go back
    </Button>
  {/if}
  {#if $step > 0 && $step < 3}
    <Button href="/projects/new?step={$step + 1}" classname="btn forward" isFilled>
      <svg src="/images/icons/arrow-right.svg" class="icon mr" />
      next step
    </Button>
  {:else if $step === 3}
    <Button classname="btn" isFilled disabled={$errors.length} on:click={endProject}>
      create project
    </Button>
  {/if}
</div>
