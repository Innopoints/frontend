<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import EditActivity from '@/components/projects/new/edit-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
  import ActivityTypes from '@/constants/projects/activity-internal-types.js';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import {
    addActivity,
    copyActivity,
    filterActivityFields,
    countDisplayActivitiesBefore,
    synchronizeActivityLists,
  } from '@/utils/project-manipulation.js';

  export let project;
  export let autosaved;
  export let competences;

  let activityList = [];

  // This component maintains an internal activity list (activityList)
  //   with objects for new activity forms and editing forms.
  //   This list must be synchronized with the actual project's activity list ($project.activities).
  // Somewhat counter-intuitive, but the activityList has nothing to do
  //   with the concept of internal activities on the backend. Moreover, internal
  //   activities are not in the activityList, since they are not displayed on the page.

  const dispatch = createEventDispatcher();
  const unsubscribe = project.subscribe(
    ({ activities: backendActivities }) => {
      activityList = synchronizeActivityLists(activityList, backendActivities);
    },
  );
  onDestroy(unsubscribe);

  function duplicateActivity({ detail: activity }) {
    const newActivity = filterActivityFields(copyActivity(activity));
    delete newActivity.id;
    newActivity._type = ActivityTypes.NEW;
    activityList.push(newActivity);
    activityList = activityList;
  }

  function deleteActivity({ detail: activity }) {
    activityList = activityList.filter(act => act.name !== activity.name);
    dispatch('delete-activity', activity.id || activity.name);
    if (activityList.length === 0) {
      const activity = getBlankActivity();
      activity._type = ActivityTypes.NEW;
      activityList.push(activity);
    }
  }
</script>

<form>
  <StepHeader step={2} {autosaved} subtitle="Step 2. Add volunteering activities" />

  {#each activityList as activity, index}
    {#if activity._type === ActivityTypes.DISPLAY}
      <ActivityCard
        {activity}
        on:copy-activity={duplicateActivity}
        on:delete-activity={deleteActivity}
        on:edit-activity={(e) => activity._type = ActivityTypes.EDIT}
      />
    {:else if activity._type !== ActivityTypes.REPLACEMENT_MARKER}
      <EditActivity
        {competences}
        bind:activity
        {activityList}
        {index}
        on:discard-activity={(e) => {
          // Dispatched for activities on backend-unsynced projects
          // when the fields are back to empty to cancel creation.
          activityList.splice(e.detail, 1);
          activityList = activityList;
        }}
        on:discard-changes={(e) => {
          // Dispatched for activities on backend-synced projects
          // when the fields are back to initial to cancel editing.
          activityList[e.detail]._type = ActivityTypes.DISPLAY;
        }}
        on:change={(e) => {
          // Dispatched when a VALID change occurs.
          const copy = copyActivity(e.detail);
          e.detail._type = ActivityTypes.REPLACEMENT_MARKER;
          dispatch('change', {
            activity: copy,
            position: countDisplayActivitiesBefore(activityList, index),
          });
        }}
      />
    {/if}
  {/each}

  <Button on:click={() => activityList = addActivity(activityList)}>
    <svg src="/images/icons/plus.svg" class="icon mr" />
    add another activity
  </Button>

  <BottomNavigation
    step={2}
    error={$project.activities.filter(act => !act.internal).length === 0 ? 2 : null}
  />
</form>
