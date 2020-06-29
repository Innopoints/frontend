<script>
  import { afterUpdate, onMount, getContext } from 'svelte';
  import { flip } from 'svelte/animate';
  import { stores } from '@sapper/app';
  import StepHeader from 'src/components/projects/new/step-header.svelte';
  import BottomNavigation from 'src/components/projects/new/bottom-navigation.svelte';
  import EditActivityCard from 'src/components/projects/new/edit-activity-card.svelte';
  import ActivityCard from 'src/components/projects/new/activity-card.svelte';
  import { Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import getBlankActivity from 'src/constants/projects/blank-activity.js';
  import defaultFeedbackQuestions from 'src/constants/projects/feedback-questions.js';
  import {
    copyActivity,
    prepareForBackend,
  } from 'src/utils/project-manipulation.js';
  import * as api from 'src/utils/api.js';
  import arraysEqual from 'src/utils/arrays-equal.js';

  const { session } = stores();

  export let project;
  export let autosaved;
  export let competences;
  $: externalActivities = $project.activities.filter(act => !act.internal);

  let activityListElement;
  let scrollToLast = false;

  afterUpdate(() => {
    if (scrollToLast) {
      // The last element is the button for new activities
      const lastCardIndex = activityListElement.children.length - 1 - 1;
      activityListElement.children[lastCardIndex].scrollIntoView({ behavior: 'smooth' });
      scrollToLast = false;
    }
  });

  function duplicateActivity({ detail: activity }) {
    const newActivity = copyActivity(activity);
    delete newActivity.id;
    createActivity(newActivity);
  }

  async function createActivity(activity) {
    try {
      ({
        id: activity.id,
        project: activity.project,
      } = await api.json(api.post(`/projects/${$project.id}/activities`, {
        data: prepareForBackend(activity),
        csrfToken: $session.account.csrf_token,
      })));
      activity._editing = true;
      $project.activities.push(activity);
      project = project;
    } catch (e) {
      showSnackbar({
        props: { text: 'Couldn\'t create the activity, try reloading the page' },
      });
      console.error(e);
    }
    scrollToLast = true;
  }

  async function deleteActivity({ detail: activity }) {
    try {
      await api.json(api.del(
        `/projects/${$project.id}/activities/${activity.id}`,
        { csrfToken: $session.account.csrf_token },
      ));
      $project.activities = $project.activities.filter(act => act.id !== activity.id);
      if ($project.activities.find(act => !act.internal) == null) {
        createActivity(getBlankActivity());
      }

      showSnackbar({
        props: {
          text: 'Activity deleted',
          action: { text: 'undo', callback() { createActivity(activity); } },
        },
      });
    } catch (e) {
      showSnackbar({
        props: { text: 'Couldn\'t delete the activity, try reloading the page' },
      });
      console.error(e);
    }
  }

  function propagateDates({ detail }) {
    for (const activity of $project.activities) {
      if (activity.internal) {
        continue;
      }

      if (activity.timeframe == null
          || activity.timeframe.start == null && activity.timeframe.end == null) {
        api.json(api.patch(`/projects/${activity.project}/activities/${activity.id}`, {
          data: prepareForBackend({ timeframe: detail.value }),
          csrfToken: $session.account.csrf_token,
        })).then(() => {
          activity.timeframe = {
            start: new Date(detail.value.start.valueOf()),
            end: new Date(detail.value.end.valueOf()),
          };
        });
      }
    }
  }

  function propagateQuestions({ detail }) {
    for (const activity of $project.activities) {
      if (activity.internal) {
        continue;
      }

      if (arraysEqual(activity.feedback_questions, defaultFeedbackQuestions)) {
        api.json(api.patch(`/projects/${activity.project}/activities/${activity.id}`, {
          data: { feedback_questions: detail.value },
          csrfToken: $session.account.csrf_token,
        })).then(() => {
          activity.feedback_questions = detail.value.slice();
        });
      }
    }
  }

  onMount(() => {
    if (externalActivities.length === 0) {
      createActivity(getBlankActivity());
    }
  });

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="form">
  <StepHeader step={2} {autosaved} subtitle="Step 2. Add volunteering activities" />

  <div class="activity-list padded" bind:this={activityListElement}>
    {#each externalActivities as activity, index (activity.id)}
      <div animate:flip={{ duration: 150 }}>
        {#if !activity._editing}
          <ActivityCard
            {activity}
            on:copy={duplicateActivity}
            on:delete={deleteActivity}
            on:edit={() => activity._editing = true}
          />
        {:else}
          <EditActivityCard
            {competences}
            bind:activity
            on:rerender={() => $project.activites = $project.activities}
            on:dates-set={propagateDates}
            on:questions-set={propagateQuestions}
          />
        {/if}
      </div>
    {/each}
    <Button outline on:click={() => createActivity(getBlankActivity())}>
      <svg src="images/icons/plus.svg" class="mr" />
      add {#if externalActivities.length > 0}another{/if} activity
    </Button>
  </div>

  <BottomNavigation
    step={2}
    error={
      externalActivities.find(act => !act.draft) == null ?
        'A project must have at least one visible activity.' : null
    }
  />
</div>

<style src="../../../../static/css/containers/projects/new/step-2.scss"></style>
