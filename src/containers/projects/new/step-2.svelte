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

  function synchronizeActivityLists({ activities: backendActivities }) {
    let activityListIdx = 0;
    for (let activity of backendActivities.filter(activity => !activity.internal)) {
      let activityProcessed = false;
      while (!activityProcessed) {
        // If the internal list is over, copy the backend activity to the end
        // Happens on the initial population of the activityList
        if (activityListIdx >= activityList.length) {
          let copy = filterActivityFields(copyActivity(activity));
          copy._type = ActivityTypes.DISPLAY;
          activityList.splice(
            activityListIdx,
            activityList[activityListIdx] != null,
            copy,
          );
          activityListIdx++;
          activityProcessed = true;
          break;
        }

        // If the activityList cursor is on a new activity form, let it be
        // Happens when there is an open form that hasn't been saved yet
        if (activityList[activityListIdx]._type === ActivityTypes.NEW) {
          activityListIdx++;
        }

        // If the activityList cursor is on a displayed activity,
        // don't change anything – it is already that same activity
        if (activityList[activityListIdx]._type === ActivityTypes.DISPLAY) {
          activityListIdx++;
          activityProcessed = true;
          break;
        }

        // If the cursor is on a replacement marker, place the backend activity on that spot
        // Happens upon creating a new activity or applying edits to an existing one
        if (activityList[activityListIdx]._type === ActivityTypes.REPLACEMENT_MARKER) {
          let copy = filterActivityFields(copyActivity(activity));
          copy._type = ActivityTypes.DISPLAY;
          activityList.splice(
            activityListIdx,
            activityList[activityListIdx] != null,
            copy,
          );
          activityListIdx++;
          activityProcessed = true;
          break;
        }

        // If the cursor is on an edit form, accept it as the backend activity
        if (activityList[activityListIdx]._type === ActivityTypes.EDIT) {
          activityListIdx++;
          activityProcessed = true;
          break;
        }
      }
    }

    // Remove the deleted activities from the end
    while (activityListIdx < activityList.length) {
      if (activityList[activityListIdx]._type === ActivityTypes.DISPLAY) {
        activityList.splice(activityListIdx, 1);
      } else {
        activityListIdx++;
      }
    }

    // Have a new activity form if the activityList is empty
    if (activityList.length === 0) {
      let activity = getBlankActivity();
      activity._type = ActivityTypes.NEW;
      activityList.push(activity);
    }

    activityList = activityList;
  }

  const dispatch = createEventDispatcher();
  const unsubscribe = project.subscribe(synchronizeActivityLists);
  onDestroy(unsubscribe);

  function duplicateActivity({ detail: id }) {
    for (let i = 0; i < activityList.length; ++i) {
      if (activityList[i]._type === ActivityTypes.DISPLAY && activityList[i].id === id) {
        const newActivity = filterActivityFields(copyActivity(activityList[i]));
        delete newActivity.id;
        newActivity._type = ActivityTypes.NEW;
        activityList.push(newActivity);
        break;
      }
    }
    activityList = activityList;
  }

  function deleteActivity({ detail: activity }) {
    activityList = activityList.filter(act => act.name !== activity.name);
    dispatch('delete-activity', activity.id || activity.name);
    if (activityList.length === 0) {
      let activity = getBlankActivity();
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
        on:edit-activity={(e) => activity._type = ActivityTypes.EDIT}
        on:copy-activity={duplicateActivity}
        on:delete-activity={deleteActivity}
      />
    {:else if activity._type !== ActivityTypes.REPLACEMENT_MARKER}
      <EditActivity
        {competences}
        {activity}
        {activityList}
        {index}
        on:discard-activity={(e) => {
          activityList.splice(e.detail, 1);
          activityList = activityList;
        }}
        on:discard-changes={(e) => {
          activityList[e.detail]._type = ActivityTypes.DISPLAY;
        }}
        on:change={(e) => {
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
