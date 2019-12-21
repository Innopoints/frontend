<script>
  import { fade } from 'svelte/transition';
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
</script>

<form transition:fade={{duration:200}}>
  <header class="padded form-header">
    <h1>
      Create a Project
      <span class="autosave visible">
        <svg src="/images/icons/check.svg" class="icon mr" />
          draft auto-saved
        </span>
    </h1>
    <h2>Step 3. Assign moderators for the project</h2>
  </header>
  <NavigationDropdown />
  <p>
    Moderators can process applications from volunteers and edit activities.
    Feedback on volunteers is also shared between all moderators.
  </p>
  <p>
    You are the creator, therefore, also a moderator.
  </p>
  <!--TODO: add autocomplete component-->
  <BottomNavigation />
</form>
