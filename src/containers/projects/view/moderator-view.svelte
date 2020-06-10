<script>
  import { createEventDispatcher, onDestroy, afterUpdate, getContext } from 'svelte';
  import { Button } from 'attractions';
  import ModeratorActivityCard from '@/components/projects/view/moderator-activity-card.svelte';
  import HourActivityCard from '@/components/projects/view/hour-activity-card.svelte';
  import FeedbackActivityCard from '@/components/projects/view/feedback-activity-card.svelte';
  import EditActivity from '@/components/projects/new/edit-activity.svelte';
  import ActivityTypes from '@/constants/projects/activity-internal-types.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import {
    addActivity,
    copyActivity,
    countDisplayActivitiesBefore,
    prepareAfterBackend,
    synchronizeActivityLists,
  } from '@/utils/project-manipulation.js';

  export let account;
  export let competences;
  export let project;

  let activityListElement;
  let scrollToLast = false;
  const review = getContext('review-mode');

  afterUpdate(() => {
    if (scrollToLast) {
      const lastCardIndex = activityListElement.children.length - 1;
      activityListElement.children[lastCardIndex].scrollIntoView({ behavior: 'smooth' });
      scrollToLast = false;
    }
  });

  let activityCards = (
    $project.activities
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
  }

  function duplicateActivity({ detail: activity }) {
    const newActivity = copyActivity(activity);
    delete newActivity.id;
    newActivity.applications = [];
    newActivity._type = ActivityTypes.NEW;
    activityCards.push(newActivity);
    scrollToLast = true;
    activityCards = activityCards;
  }

  const dispatch = createEventDispatcher();
</script>

<div class="activities moderated padded" bind:this={activityListElement}>
  {#if $project.lifetime_stage === ProjectStages.ONGOING}
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
            // Dispatched for activities on backend-unsynced projects
            // when the fields are back to empty to cancel creation.
            activityCards.splice(e.detail, 1);
            activityCards = activityCards;
          }}
          on:discard-changes={(e) => {
            // Dispatched for activities on backend-synced projects
            // when the fields are back to initial to cancel editing.
            activityCards[e.detail]._type = ActivityTypes.DISPLAY;
          }}
          on:change={(e) => {
            // Dispatched when a VALID change occurs.
            const copy = copyActivity(e.detail);
            e.detail._type = ActivityTypes.REPLACEMENT_MARKER;
            dispatch('activity-changed', {
              activityCopy: copy,
              position: countDisplayActivitiesBefore(activityCards, index),
            });
          }}
        />
      {/if}
    {/each}
  {:else if review}
    {#each activityCards as activity}
      <FeedbackActivityCard
        review
        {activity}
        {competences}
        on:read-feedback
      />
    {/each}
  {:else if $project.lifetime_stage === ProjectStages.FINALIZING}
    {#each activityCards as activity}
      <HourActivityCard
        {account}
        {activity}
        on:save-hours
        on:create-report
        on:delete-report
      />
    {/each}
  {:else if $project.lifetime_stage === ProjectStages.FINISHED}
    {#each activityCards as activity}
      <FeedbackActivityCard
        {activity}
        {competences}
        {review}
        on:read-feedback
      />
    {/each}
  {/if}
</div>
{#if $project.lifetime_stage === ProjectStages.ONGOING}
  <Button on:click={() => activityCards = addActivity(activityCards)}>
    <svg src="images/icons/plus.svg" class="mr" />
    add another activity
  </Button>
{/if}
