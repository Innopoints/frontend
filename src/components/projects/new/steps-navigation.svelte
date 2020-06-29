<script>
  import { DropdownShell, Dropdown, Button } from 'attractions';
  import stepNames from 'src/constants/projects/step-names';

  export let step;
</script>

<div class="steps-navigation">
  <DropdownShell let:toggle class="steps-navigation">
    <Button class="handle" on:click={toggle}>
      <span class="step-index"><span class="step">step</span> {step}</span>
      <span class="step-name">{stepNames[step]}</span>
      <svg class="ml dropdown-chevron" src="static/images/icons/chevron-down.svg" />
    </Button>
    <Dropdown>
      {#each stepNames as stepName, index}
        <Button selected={step === index} href="/projects/new{index > 0 ? `?step=${index}` : ''}">
          {#if index === 0}
            <svg src="static/images/icons/rotate-ccw.svg" class="icon" />
          {:else}
            <span class="icon">{index}</span>
          {/if}
          <span class="text">{stepName}</span>
        </Button>
      {/each}
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../../static/css/components/projects/new/steps-navigation.scss"></style>
