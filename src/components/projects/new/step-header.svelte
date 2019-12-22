<script>
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';
  import {saved} from '@/store/new-project';

  export let subtitle;
</script>

<header class="padded form-header">
  <h1>
    Create a Project
    {#if $saved}
      <span class="autosave visible">
        <svg src="/images/icons/check.svg" class="icon mr" />
        draft auto-saved
      </span>
    {/if}
  </h1>
  <h2>{subtitle}</h2>
</header>
<NavigationDropdown />
