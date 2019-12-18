<script>
  import { fade } from 'svelte/transition';
  import NavigationDropdown from '@/components/projects/new/steps-navigation.svelte';
  import NewActivityCard from '@/components/projects/new/new-activity.svelte';
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
  <NewActivityCard />

  <Button>
    <svg src="/images/icons/plus.svg" class="icon mr" />
    add another activity
  </Button>
  <div class="actions">
    <p class="error">Some required fields are still empty :c</p>
    <Button href="/projects/new?step=1" classname="btn back">
      <svg src="/images/icons/arrow-left.svg" class="icon mr" />
      go back
    </Button>
    <Button href="/projects/new?step=3" classname="btn forward" isFilled>
      <svg src="/images/icons/arrow-right.svg" class="icon mr" />
      next step
    </Button>
  </div>
</form>
