<script>
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';

  export let subtitle;
</script>

<header class="padded form-header">
  <h1>
    Create a Project
    <span class="autosave visible">
        <svg src="/images/icons/check.svg" class="icon mr" />
          draft auto-saved
        </span>
  </h1>
  <h2>{subtitle}</h2>
</header>
<NavigationDropdown />
