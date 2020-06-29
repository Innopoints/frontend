<script>
  import { onDestroy } from 'svelte';
  import { H1, H2 } from 'attractions';
  import StepsNavigation from 'src/components/projects/new/steps-navigation.svelte';

  export let subtitle;
  export let step;
  export let autosaved;
  let saved = false;
  let savedTimeout = null;

  const unsubscribe = autosaved.subscribe(value => {
    if (!value) {
      return;
    }

    saved = true;
    clearTimeout(savedTimeout);
    savedTimeout = setTimeout(() => {
      saved = false;
      savedTimeout = null;
      autosaved.set(false);
    }, 1500);
  });
  onDestroy(unsubscribe);
</script>

<header class="step-header padded">
  <H1>
    Create a Project
    {#if saved}
      <span class="autosave visible">
        <svg src="images/icons/check.svg" class="icon mr" />
        draft auto-saved
      </span>
    {/if}
  </H1>
  <H2 class="hide-on-less-tb">{subtitle}</H2>
</header>
<StepsNavigation {step} />

<style src="../../../../static/css/components/projects/new/step-header.scss"></style>
