<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import NewActivityCard from '@/components/projects/new/new-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
  import Sortable from 'sortablejs';
  import {project, addActivity} from '@/store/new-project';
  $: activities = $project.activities;

  let dragContainer = null;
  onMount(() => mountSortable());
  const mountSortable = () => {
    new Sortable(dragContainer, {
      handle: '.drag-handle',
      draggable: '.card.activity',
      animations: 150,
      sort: true,
      // onEnd: function (e) {
      //   let els = dragContainer.querySelectorAll('.card.activity');
      //   console.log(e);
      //   console.log(els);
      // },
    });
  };
</script>

<form transition:fade={{duration:200}} bind:this={dragContainer}>
  <StepHeader subtitle="Step 2. Add volunteering activities" />

  {#each activities as activity (activity.name + activity.index)}
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
