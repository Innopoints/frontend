<script>
  import { fade } from 'svelte/transition';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import NewActivityCard from '@/components/projects/new/new-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
  import {project, addActivity} from '@/store/new-project';
  $: activities = $project.activities;
</script>

<form transition:fade={{duration:200}}>
  <StepHeader subtitle="Step 2. Add volunteering activities" />

  {#each activities as activity (activity.name + activity.order)}
    {#if activity.editing}
      <NewActivityCard newly={false} activity={activity} />
    {:else}
      <ActivityCard {activity} />
    {/if}
  {/each}

  {#if $project.newActivity}
    <NewActivityCard activity={$project.newActivity} />
  {:else}
    <Button on:click={addActivity}>
      <svg src="/images/icons/plus.svg" class="icon mr" />
      add another activity
    </Button>
  {/if}

  <BottomNavigation />
</form>
