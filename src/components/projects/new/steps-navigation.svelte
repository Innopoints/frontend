<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import {step} from '@/store/new-project';
  import stepNames from '@/constants/projects/step-names';
  $: activeStep = stepNames[$step];
</script>

<Dropdown classname="dropdown-shell steps-navigation" nowrap>
  <span slot="label" class="step-index"><span class="step">step </span>{$step}</span>
  <span slot="label" class="step-name">{activeStep}</span>
  {#each stepNames as steppy, i (steppy)}
    <Button href="/projects/new{i > 0 ? `?step=${i}` : ''}">
      {#if i === 0}
        <svg src="/images/icons/rotate-ccw.svg" class="icon" />
      {:else}
        <span class="icon">{i}</span>
      {/if}
      <span class="text">{steppy}</span>
    </Button>
  {/each}
</Dropdown>
