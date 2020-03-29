<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['drafts', '/projects/drafts'],
      ['competences', '/competences'],
    ]));
    if (data.account == null) {
      this.error(403, 'Create a Project');
    }
    return data;
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { stores, goto, prefetch } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import StepZero from '@/containers/projects/new/step-0.svelte';
  import StepOne from '@/containers/projects/new/step-1.svelte';
  import StepTwo from '@/containers/projects/new/step-2.svelte';
  import StepThree from '@/containers/projects/new/step-3.svelte';
  import * as api from '@/utils/api.js';
  import generateQueryString from '@/utils/generate-query-string.js';
  import {
    determineInsertionIndex,
    filterProjectFields,
    prepareForBackend,
    prepareAfterBackend,
  } from '@/utils/project-manipulation.js';
  import activityTypes from '@/constants/projects/activity-internal-types.js';

  const { page } = stores();

  export let drafts;
  export let account;
  export let competences;

  let project = writable(null);
  let autosaved = writable(false);
  let lastSyncedName = null;
  const unsubscribe = project.subscribe(saveProject);
  onDestroy(unsubscribe);
  let duplicateName = false;

  // Step management
  $: step = ($project != null ? +$page.query.step || 0 : 0);
  onMount(() => {
    if ($project == null && $page.query.step != null) {
      goto('/projects/new');
    }
  });

  function goToStep(stepIdx) {
    goto(`/projects/new?step=${stepIdx}`);
  }

  // Form processsing
  async function deleteDraft({ detail: draftID }) {
    try {
      await api.json(api.del('/projects/' + draftID));
      drafts = drafts.filter(draft => draft.id !== draftID);
    } catch (e) {
      console.error(e);
    }
  }

  async function loadDraft({ detail: draftID }) {
    try {
      const draftProject = await api.json(api.get('/projects/' + draftID));
      for (let activity of draftProject.activities) {
        activity.timeframe = {
          start: new Date(activity.timeframe.start),
          end: new Date(activity.timeframe.end),
        };
        if (activity.application_deadline != null) {
          activity.application_deadline = new Date(activity.application_deadline);
        }
      }
      lastSyncedName = draftProject.name;
      $project = draftProject;
      goToStep(1);
    } catch (e) {
      console.error(e);
    }
  }

  /* A subscriber to the $project store, receives an actual project object. */
  async function saveProject(projectObj) {
    if (projectObj == null || projectObj.name == null) {
      return;
    }

    if (projectObj.name === '' || projectObj.organizer === '') {
      return;
    }

    try {
      if (projectObj.name !== lastSyncedName) {
        const queryString = generateQueryString(new Map([['name', projectObj.name]]));
        const nameAvailable = await api.json(api.get('/projects/name_available?' + queryString));

        if (!nameAvailable) {
          duplicateName = true;
          return;
        }
      }

      duplicateName = false;
      lastSyncedName = projectObj.name;

      if (projectObj.id != null) {
        await api.json(api.patch('/projects/' + projectObj.id, {
          data: filterProjectFields(projectObj, true),
        }));
      } else {
        project.set(await api.json(api.post('/projects', {
          data: projectObj,
        })));
      }
      autosaved.set(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function publishProject() {
    try {
      prefetch('/projects');
      await api.json(api.patch(`/projects/${$project.id}/publish`));
      goto('/projects');
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
      if (type === activityTypes.NEW) {
        if ($project.id == null) {
          // The project does not exist on the backend yet
          updatedActivity = detail.activityCopy;
        } else {
          updatedActivity = await api.json(api.post(`/projects/${$project.id}/activities`, {
            data: detail.activityCopy,
          }));
          prepareAfterBackend(updatedActivity);
        }
        $project.activities.splice(index, 0, updatedActivity);
      } else if (type === activityTypes.EDIT) {
        if ($project.id == null) {
          // The project does not exist on the backend yet
          updatedActivity = detail.activityCopy;
          $project.activities.splice(index, 1, updatedActivity);
        } else {
          const activityID = detail.activityCopy.id;
          delete detail.activityCopy.id;

          updatedActivity = await api.json(api.patch(
            `/projects/${$project.id}/activities/${activityID}`,
            { data: detail.activityCopy },
          ));
          prepareAfterBackend(updatedActivity);
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
    $project.activities = $project.activities;
  }

  async function processActivityDeletion({ detail: activityID }) {
    // activityID may be:
    //  - the actual ID of the activity on the backend, if the project exists on the backend;
    //  - the name of the activity, if the project does not exist on the backend.
    if ($project.id != null) {
      try {
        await api.json(api.del(`/projects/${$project.id}/activities/${activityID}`));
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

  <link rel="stylesheet" href="/css/bundles/projects-new.min.css" />
  {#if account}
    {#if account.is_admin}
      <link rel="prefetch" as="style" href="/css/bundles/dashboard.min.css" />
    {:else}
      <link rel="prefetch" as="style" href="/css/bundles/profile.min.css" />
    {/if}
  {/if}
</svelte:head>

<Layout user={account}>
  <div class="material step{step}">
    {#if step === 0}
      <StepZero
        {drafts}
        on:project-start={(e) => { $project = e.detail; goToStep(1); }}
        on:delete-draft={deleteDraft}
        on:load-draft={loadDraft}
      />
    {:else if step === 1}
      <StepOne
        {project}
        {duplicateName}
        {autosaved}
      />
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
</Layout>
