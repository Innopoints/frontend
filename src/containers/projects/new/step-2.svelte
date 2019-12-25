<script>
  import { fade } from 'svelte/transition';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import NewActivityCard from '@/components/projects/new/new-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
  import {project} from '@/store/new-project';
</script>

<form transition:fade={{duration:200}}>
  <StepHeader subtitle="Step 2. Add volunteering activities" />

  {#each $project.activities as activity}
    <ActivityCard />
  {/each}

  {#if $project.newActivity}
    <NewActivityCard />
  {:else}
    <Button>
      <svg src="/images/icons/plus.svg" class="icon mr" />
      add another activity
    </Button>
  {/if}

  <BottomNavigation />
</form>
