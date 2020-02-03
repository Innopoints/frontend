<script>
  import StepsNavigation from '@/components/projects/new/steps-navigation.svelte';

  export let subtitle;
  export let step;
  let saved = false;
  let savedTimeout = null;

  export function showSaved() {
    saved = true;
    if (savedTimeout != null) {
      clearTimeout(savedTimeout);
    }
    savedTimeout = setTimeout(() => {
      saved = false;
      savedTimeout = null;
    }, 1500);
  }
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
