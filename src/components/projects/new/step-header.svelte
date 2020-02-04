<script>
  import { onDestroy } from 'svelte';
  import StepsNavigation from '@/components/projects/new/steps-navigation.svelte';

  export let subtitle;
  export let step;
  export let autosaved;
  let saved = false;
  let savedTimeout = null;

  const unsubscribe = autosaved.subscribe(value => {
    if (value) {
      saved = true;
      if (savedTimeout != null) {
        clearTimeout(savedTimeout);
      }
      savedTimeout = setTimeout(() => {
        saved = false;
        savedTimeout = null;
        autosaved.set(false);
      }, 1500);
    }
  });
  onDestroy(unsubscribe);
</script>

<header class="padded form-header">
  <h1>
    Create a Project
    {#if saved}
      <span class="autosave visible">
        <svg src="/images/icons/check.svg" class="icon mr" />
        draft auto-saved
      </span>
    {/if}
  </h1>
  <h2>{subtitle}</h2>
</header>
<StepsNavigation {step} />
