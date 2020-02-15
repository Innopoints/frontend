<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import EditActivity from '@/components/projects/new/edit-activity.svelte';
  import ActivityCard from '@/components/projects/new/activity.svelte';
  import Button from 'ui/button.svelte';
  // import { filterProjectFields } from '@/utils/project-manipulation.js';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import activityTypes from '@/constants/projects/activity-internal-types.js';
  import { copyActivity, filterActivityFields } from '@/utils/project-manipulation.js';

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
          copy._type = activityTypes.DISPLAY;
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
        if (activityList[activityListIdx]._type === activityTypes.NEW) {
          activityListIdx++;
        }

        // If the activityList cursor is on a displayed activity,
        // don't change anything – it is already that same activity
        if (activityList[activityListIdx]._type === activityTypes.DISPLAY) {
          activityListIdx++;
          activityProcessed = true;
          break;
        }

        // If the cursor is on a replacement marker, place the backend activity on that spot
        // Happens upon creating a new activity or applying edits to an existing one
        if (activityList[activityListIdx]._type === activityTypes.REPLACEMENT_MARKER) {
          let copy = filterActivityFields(copyActivity(activity));
          copy._type = activityTypes.DISPLAY;
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
        if (activityList[activityListIdx]._type === activityTypes.EDIT) {
          activityListIdx++;
          activityProcessed = true;
          break;
        }
      }
    }

    // Remove the deleted activities from the end
    while (activityListIdx < activityList.length) {
      if (activityList[activityListIdx]._type === activityTypes.DISPLAY) {
        activityList.splice(activityListIdx, 1);
      } else {
        activityListIdx++;
      }
    }

    // Have a new activity form if the activityList is empty
    if (activityList.length === 0) {
      let activity = getBlankActivity();
      activity._type = activityTypes.NEW;
      activityList.push(activity);
    }

    activityList = activityList;
  }

  const dispatch = createEventDispatcher();
  const unsubscribe = project.subscribe(synchronizeActivityLists);
  onDestroy(unsubscribe);

  /* Adds a new form to the list of activites */
  function addActivity() {
    const newActivity = getBlankActivity();
    newActivity._type = activityTypes.NEW;
    activityList.push(newActivity);
    activityList = activityList;
  }

  function duplicateActivity({ detail: id }) {
    for (let i = 0; i < activityList.length; ++i) {
      if (activityList[i]._type === activityTypes.DISPLAY && activityList[i].id === id) {
        const newActivity = filterActivityFields(copyActivity(activityList[i]));
        delete newActivity.id;
        newActivity._type = activityTypes.NEW;
        activityList.push(newActivity);
        break;
      }
    }
    activityList = activityList;
  }

  function deleteActivity({ detail: activity }) {
    if (activity.id != null) {
      activityList = activityList.filter(act => act.id !== activity.id);
      dispatch('delete-activity', activity.id);
    } else {
      activityList = activityList.filter(act => act.name !== activity.name);
    }
  }

  function countDisplayActivitiesBefore(index) {
    let result = 0;
    for (let i = 0; i < index; ++i) {
      if (activityList[i]._type === activityTypes.DISPLAY) {
        result++;
      }
    }
    return result;
  }
</script>

<form>
  <StepHeader step={2} {autosaved} subtitle="Step 2. Add volunteering activities" />

  {#each activityList as activity, index}
    {#if activity._type === activityTypes.DISPLAY}
      <ActivityCard
        {activity}
        on:edit-activity={(e) => activity._type = activityTypes.EDIT}
        on:copy-activity={duplicateActivity}
        on:delete-activity={deleteActivity}
      />
    {:else if activity._type !== activityTypes.REPLACEMENT_MARKER}
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
          activityList[e.detail]._type = activityTypes.DISPLAY;
        }}
        on:change={(e) => {
          console.log(JSON.parse(JSON.stringify(e.detail)));
          const copy = copyActivity(e.detail);
          e.detail._type = activityTypes.REPLACEMENT_MARKER;
          dispatch('change', {
            activity: copy,
            position: countDisplayActivitiesBefore(index),
          });
        }}
      />
    {/if}
  {/each}

  <Button on:click={addActivity}>
    <svg src="/images/icons/plus.svg" class="icon mr" />
    add another activity
  </Button>

  <BottomNavigation step={2} />
</form>
