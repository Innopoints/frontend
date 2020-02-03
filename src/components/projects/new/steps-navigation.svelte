<script>
  import Dropdown from 'ui/dropdown.svelte';
  import Button from 'ui/button.svelte';
  import stepNames from '@/constants/projects/step-names';

  export let step;
</script>

<Dropdown classname="steps-navigation" nowrap>
  <span slot="label" class="step-index">
    <span class="step">step </span> {step}
  </span>
  <span slot="label" class="step-name">{stepNames[step]}</span>
  {#each stepNames as stepName, i}
    <Button href="/projects/new{i > 0 ? `?step=${i}` : ''}">
      {#if i === 0}
        <svg src="/images/icons/rotate-ccw.svg" class="icon" />
      {:else}
        <span class="icon">{i}</span>
      {/if}
      <span class="text">{stepName}</span>
    </Button>
  {/each}
</Dropdown>
