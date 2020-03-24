<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import Button from 'ui/button.svelte';
  import ModeratorActivityCard from '@/components/projects/view/moderator-activity-card.svelte';
  import EditActivity from '@/components/projects/new/edit-activity.svelte';
  import ActivityTypes from '@/constants/projects/activity-internal-types.js';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import {
    addActivity,
    copyActivity,
    countDisplayActivitiesBefore,
    filterActivityFields,
    prepareAfterBackend,
    synchronizeActivityLists,
  } from '@/utils/project-manipulation.js';

  export let activities;
  export let competences;
  export let project;

  let activityCards = (
    activities
      .filter(x => !x.internal)
      .map(act => {
        act._type = ActivityTypes.DISPLAY;
        prepareAfterBackend(act);
        return act;
      })
  );

  // This component maintains an internal activity list (activityCards)
  //   with objects for new activity forms and editing forms.
  //   This list must be synchronized with the actual project's activity list ($project.activities).
  // Somewhat counter-intuitive, but the activityCards have nothing to do
  //   with the concept of internal activities on the backend. Moreover, internal
  //   activities are not in the activityCards, since they are not displayed on the page.

  const unsubscribe = project.subscribe(
    ({ activities: backendActivities }) => {
      activityCards = synchronizeActivityLists(activityCards, backendActivities);
    },
  );
  onDestroy(unsubscribe);

  function deleteActivity({ detail: activity }) {
    activity._type = ActivityTypes.DELETION_MARKER;
    dispatch('delete-activity', activity);
    if (activityCards.length === 0) {
      const activity = getBlankActivity();
      activity._type = ActivityTypes.NEW;
      activityCards.push(activity);
    }
  }

  function duplicateActivity({ detail: activity }) {
    const newActivity = filterActivityFields(copyActivity(activity));
    delete newActivity.id;
    newActivity._type = ActivityTypes.NEW;
    activityCards.push(newActivity);
    activityCards = activityCards;
  }

  const dispatch = createEventDispatcher();
</script>

<div class="activities moderated padded">
  {#each activityCards as activity, index}
    {#if activity._type === ActivityTypes.DISPLAY
      || activity._type === ActivityTypes.DELETION_MARKER}
      <ModeratorActivityCard
        {activity}
        {competences}
        on:edit-activity={() => activity._type = ActivityTypes.EDIT}
        on:delete-activity={deleteActivity}
        on:duplicate-activity={duplicateActivity}
        on:view-reports
        on:application-status-changed
      />
    {:else if activity._type !== ActivityTypes.REPLACEMENT_MARKER}
      <EditActivity
        {competences}
        bind:activity
        activityList={activityCards}
        {index}
        on:discard-activity={(e) => {
          activityCards.splice(e.detail, 1);
          activityCards = activityCards;
        }}
        on:discard-changes={(e) => {
          activityCards[e.detail]._type = ActivityTypes.DISPLAY;
        }}
        on:change={(e) => {
          const copy = copyActivity(e.detail);
          e.detail._type = ActivityTypes.REPLACEMENT_MARKER;
          dispatch('activity-changed', {
            activity: copy,
            position: countDisplayActivitiesBefore(activityCards, index),
          });
        }}
      />
    {/if}
  {/each}
</div>
<Button on:click={() => activityCards = addActivity(activityCards)}>
  <svg src="/images/icons/plus.svg" class="icon mr" />
  add another activity
</Button>
