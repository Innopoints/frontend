<script>
  import { fade } from 'svelte/transition';
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import NewActivityCard from '@/components/projects/new/new-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
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
    <h2>Step 2. Add volunteering activities</h2>
  </header>
  <NavigationDropdown />
  <ActivityCard />
  <ActivityCard />
  <NewActivityCard />

  <Button>
    <svg src="/images/icons/plus.svg" class="icon mr" />
    add another activity
  </Button>
  <BottomNavigation />
</form>
