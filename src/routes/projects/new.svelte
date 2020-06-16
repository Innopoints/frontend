<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['drafts', '/projects/drafts'],
      ['competences', '/competences'],
    ]));

    if (session.account == null) {
      this.error(403, 'Create a Project');
    }

    data.account = session.account;
    return data;
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { stores, goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import { SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import StepZero from '@/containers/projects/new/step-0.svelte';
  import StepOne from '@/containers/projects/new/step-1.svelte';
  import StepTwo from '@/containers/projects/new/step-2.svelte';
  import StepThree from '@/containers/projects/new/step-3.svelte';
  import * as api from '@/utils/api.js';
  import {
    computeDiff,
    copyProject,
    determineInsertionIndex,
    prepareForBackend,
    prepareAfterBackend,
  } from '@/utils/project-manipulation.js';
  import ActivityTypes from '@/constants/projects/activity-internal-types.js';

  const { page } = stores();

  export let drafts;
  export let account;
  export let competences;

  let lastSyncedProject = null;
  let project = writable(null);
  let saveProjectDebounce = null;
  const unsubscribe = project.subscribe(function(projectObject) {
    clearTimeout(saveProjectDebounce);
    saveProjectDebounce = setTimeout(saveProject, 150, projectObject);
  });
  onDestroy(unsubscribe);

  let autosaved = writable(false);
  let snackbarContainer = null;

  // Step management
  $: step = ($project != null ? +$page.query.step || 0 : 0);
  onMount(() => {
    if ($project == null && $page.query.step != null) {
      goto('/projects/new');
    }
  });

  async function saveProject(projectObject) {
    const diff = computeDiff(projectObject, lastSyncedProject);
    if (diff == null) {
      return;
    }

    const requestOptions = {
      data: diff,
      csrfToken: account.csrf_token,
    };

    try {
      lastSyncedProject = copyProject(projectObject);
      if (projectObject.id != null) {
        await api.json(api.patch(`/projects/${projectObject.id}`, requestOptions));
      } else {
        ({ id: projectObject.id } = await api.json(api.post('/projects', requestOptions)));
      }
      autosaved.set(true);
    } catch (e) {
      snackbarContainer && snackbarContainer.showSnackbar({
        props: { text: 'Could not autosave. Some changes might be lost.' },
      });
      console.error(e);
    }
  }

  async function publishProject() {
    try {
      await api.json(api.patch(
        `/projects/${$project.id}/publish`,
        { csrfToken: account.csrf_token },
      ));
      goto(`/projects/${$project.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  async function processActivityChange({ detail }) {
    const type = detail.activityCopy._type;
    delete detail.activityCopy._type;
    prepareForBackend(detail.activityCopy);

    const index = determineInsertionIndex($project.activities, detail.position);
    let updatedActivity;
    try {
      if (type === ActivityTypes.NEW
          || (type === ActivityTypes.EDIT && detail.activityCopy.id == null)) {
        const replacedTemplateIdx = $project.activities.findIndex(
          act => act.name === detail.activityCopy.name,
        );
        if ($project.id == null) {
          // The project does not exist on the backend yet
          updatedActivity = detail.activityCopy;
        } else {
          updatedActivity = await api.json(api.post(`/projects/${$project.id}/activities`, {
            data: detail.activityCopy,
            csrfToken: account.csrf_token,
          }));
        }
        if (replacedTemplateIdx !== -1) {
          $project.activities.splice(replacedTemplateIdx, 1, updatedActivity);
        } else {
          $project.activities.splice(index, 0, updatedActivity);
        }
      } else if (type === ActivityTypes.EDIT) {
        if ($project.id == null) {
          // The project does not exist on the backend yet
          updatedActivity = detail.activityCopy;
          $project.activities.splice(index, 1, updatedActivity);
        } else {
          const activityID = detail.activityCopy.id;
          delete detail.activityCopy.id;

          updatedActivity = await api.json(api.patch(
            `/projects/${$project.id}/activities/${activityID}`,
            { data: detail.activityCopy, csrfToken: account.csrf_token },
          ));
          updatedActivity.id = activityID;

          $project.activities.splice(
            $project.activities.findIndex(act => act.id === activityID),
            1,
            updatedActivity,
          );
        }
      }
    } catch (e) {
      console.error(e);
    }

    prepareAfterBackend(updatedActivity);
    for (let activity of $project.activities) {
      if (activity._type === ActivityTypes.TEMPLATE && activity.timeframe == null) {
        activity.timeframe = {
          start: updatedActivity.timeframe.start,
          end: updatedActivity.timeframe.end,
        };
      }
    }

    $project.activities = $project.activities;
  }

  async function processActivityDeletion({ detail: activityID }) {
    // activityID may be:
    //  - the actual ID of the activity on the backend, if the project exists on the backend;
    //  - the name of the activity, if the project does not exist on the backend.
    if (activityID == null) {
      return;
    }

    if ($project.id != null && typeof activityID == 'number') {
      try {
        await api.json(api.del(
          `/projects/${$project.id}/activities/${activityID}`,
          { csrfToken: account.csrf_token },
        ));
        $project.activities = $project.activities.filter(act => act.id !== activityID);
      } catch (e) {
        console.error(e);
      }
    } else {
      $project.activities = $project.activities.filter(act => act.name !== activityID);
    }
  }
</script>

<svelte:head>
  <title>Create Project – Innopoints</title>
</svelte:head>

<Layout user={account}>
  <SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT} bind:this={snackbarContainer}>
    <div class="material">
      {#if step === 0}
        <StepZero {drafts} {project} />
      {:else if step === 1}
        <StepOne {project} {autosaved} />
      {:else if step === 2}
        <StepTwo
          {project}
          {autosaved}
          {competences}
          on:change={processActivityChange}
          on:delete-activity={processActivityDeletion}
        />
      {:else}
        <StepThree
          {project}
          {autosaved}
          on:publish={publishProject}
        />
      {/if}
    </div>
  </SnackbarContainer>
</Layout>

<style src="../../../static/css/routes/projects/new.scss"></style>
