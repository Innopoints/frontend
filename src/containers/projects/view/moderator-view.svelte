<script>
  import { afterUpdate, getContext } from 'svelte';
  import { flip } from 'svelte/animate';
  import { Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ModeratorActivityCard from '@/components/projects/view/moderator-activity-card.svelte';
  import ModeratorDraftCard from '@/components/projects/view/moderator-draft-card.svelte';
  import FinalizingActivityCard from '@/components/projects/view/finalizing-activity-card.svelte';
  import FeedbackActivityCard from '@/components/projects/view/feedback-activity-card.svelte';
  import DangerConfirmDialog from '@/components/projects/view/danger-confirm-dialog.svelte';
  import EditActivityCard from '@/components/projects/new/edit-activity-card.svelte';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import getBlankActivity from '@/constants/projects/blank-activity.js';
  import {
    copyActivity,
    prepareForBackend,
  } from '@/utils/project-manipulation.js';
  import * as api from '@/utils/api.js';

  export let account;
  export let competences;
  export let project;
  $: externalActivities = $project.activities.filter(act => !act.internal);

  let activityListElement;
  let scrollToLast = false;
  const review = getContext('review-mode');

  const activityDeletionDialog = {
    open: false,
    activity: null,
    show({ detail: activity }) {
      activityDeletionDialog.activity = activity;
      activityDeletionDialog.open = true;
    },
    async deleteActivity({ detail: activity }) {
      activityDeletionDialog.open = false;
      try {
        await api.json(api.del(
          `/projects/${$project.id}/activities/${activity.id}`,
          { csrfToken: account.csrf_token },
        ));
        $project.activities = $project.activities.filter(act => act.id !== activity.id);
        if ($project.activities.find(act => !act.internal) == null) {
          createActivity(getBlankActivity());
        }

        showSnackbar({ props: { text: 'Activity deleted' } });
      } catch (e) {
        showSnackbar({
          props: { text: 'Couldn\'t delete the activity, try reloading the page.' },
        });
        console.error(e);
      }
    },
  };

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
        csrfToken: account.csrf_token,
      })));
      activity._editing = true;
      $project.activities.push(activity);
      project = project;
    } catch (e) {
      showSnackbar({
        props: { text: 'Couldn\'t create the activity, try reloading the page.' },
      });
      console.error(e);
    }
    scrollToLast = true;
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="activity-list padded" bind:this={activityListElement}>
  {#if $project.lifetime_stage === ProjectStages.ONGOING}
    {#each externalActivities as activity, index (activity.id)}
      <div animate:flip={{ duration: 150 }}>
        {#if activity._editing}
          <EditActivityCard
            {competences}
            bind:activity
            on:rerender={() => externalActivities = externalActivities}
          />
        {:else if activity.draft}
          <ModeratorDraftCard
            {activity}
            on:edit={() => activity._editing = true}
            on:delete={activityDeletionDialog.show}
          />
        {:else}
          <ModeratorActivityCard
            {activity}
            {competences}
            on:copy={duplicateActivity}
            on:delete={activityDeletionDialog.show}
            on:edit={() => activity._editing = true}
          />
        {/if}
      </div>
    {/each}
  {:else if review}
    {#each externalActivities as activity}
      <FeedbackActivityCard
        review
        {activity}
        {competences}
        on:read-feedback
      />
    {/each}
  {:else if $project.lifetime_stage === ProjectStages.FINALIZING}
    {#each externalActivities as activity}
      <FinalizingActivityCard {account} {activity} />
    {/each}
  {:else if $project.lifetime_stage === ProjectStages.FINISHED}
    {#each externalActivities as activity}
      <FeedbackActivityCard
        {activity}
        {competences}
        {review}
        on:read-feedback
      />
    {/each}
  {/if}
  {#if $project.lifetime_stage === ProjectStages.ONGOING}
    <Button on:click={() => createActivity(getBlankActivity())}>
      <svg src="images/icons/plus.svg" class="mr" />
      add another activity
    </Button>
  {/if}
</div>

<DangerConfirmDialog
  textYes="yes, delete"
  bind:open={activityDeletionDialog.open}
  eventDetail={activityDeletionDialog.activity}
  on:confirm={activityDeletionDialog.deleteActivity}
>
  Are you sure you want to delete this activity?
  <p class="mt">
    <em class="consequences">
      All volunteering applications will be discarded.
    </em>
  </p>
</DangerConfirmDialog>
