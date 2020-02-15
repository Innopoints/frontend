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
  import { stores, goto } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import StepZero from '@/containers/projects/new/step-0.svelte';
  import StepOne from '@/containers/projects/new/step-1.svelte';
  import StepTwo from '@/containers/projects/new/step-2.svelte';
  // import StepThree from '@/containers/projects/new/step-3.svelte';
  import * as api from '@/utils/api.js';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { filterProjectFields } from '@/utils/project-manipulation.js';
  import activityTypes from '@/constants/projects/activity-internal-types.js';

  const { page, session } = stores();

  export let drafts;
  export let account;
  export let competences;
  $session.user = account;

  let project = writable(null);
  let autosaved = writable(false);
  let lastSyncedName = null;
  const unsubscribe = project.subscribe(saveProject);
  onDestroy(unsubscribe);
  let errors = {
    name: {
      duplicate: false,
    },
  };

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

  function toISOFormat(date) {
    return date.toISOString().slice(0, -1) + '+00:00';
  }

  // Form processsing
  async function deleteDraft({ detail: draftID }) {
    try {
      const resp = await api.del('/projects/' + draftID);
      if (!resp.ok) {
        console.error(await resp.text());
      } else {
        drafts = drafts.filter(draft => draft.id !== draftID);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function loadDraft({ detail: draftID }) {
    try {
      const resp = await api.get('/projects/' + draftID);
      if (!resp.ok) {
        console.error(await resp.text());
        return;
      }

      const draftProject = await resp.json();
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

    if (projectObj.name !== lastSyncedName) {
      const queryString = generateQueryString(new Map([['name', projectObj.name]]));
      const nameAvailable = await api.get('/projects/name_available?' + queryString);
      if (!nameAvailable.ok) {
        if (nameAvailable.status === 400) {
          console.error(await nameAvailable.json());
        } else {
          console.error(await nameAvailable.text());
        }
        return;
      }

      if (!(await nameAvailable.json())) {
        errors.name.duplicate = true;
        return;
      } else {
        errors.name.duplicate = false;
      }
    }

    lastSyncedName = projectObj.name;

    if (projectObj.id != null) {
      const resp = await api.patch('/projects/' + projectObj.id, {
        data: filterProjectFields(projectObj, true),
      });
      if (resp.ok) {
        autosaved.set(true);
      } else if (resp.status === 400) {
        console.error(await resp.json());
      } else {
        console.error(await resp.text());
      }
    } else {
      const resp = await api.post('/projects', {
        data: projectObj,
      });
      if (resp.ok) {
        project.set(await resp.json());
        autosaved.set(true);
      } else if (resp.status === 400) {
        console.error(await resp.json());
      } else {
        console.error(await resp.text());
      }
    }
  }

  async function processActivityChange({ detail }) {
    const type = detail.activity._type;
    delete detail.activity._type;

    let insertionIndex = 0;
    while (detail.position) {
      if (!$project.activities[insertionIndex].internal) {
        detail.position--;
      }
      insertionIndex++;
    }

    if (detail.activity.fixed_reward) {
      detail.activity.working_hours = 1;
    }

    detail.activity.timeframe = {
      start: toISOFormat(detail.activity.timeframe.start),
      end: toISOFormat(detail.activity.timeframe.end),
    };

    if (detail.activity.application_deadline != null) {
      detail.activity.application_deadline = toISOFormat(detail.activity.application_deadline);
    }

    if (type === activityTypes.NEW) {
      if ($project.id == null) {
        // If the project does not exist on the backend yet
        $project.activities.splice(insertionIndex, 0, detail.activity);
      } else {
        const resp = await api.post(`/projects/${$project.id}/activities`, {
          data: detail.activity,
        });

        if (!resp.ok) {
          if (resp.status === 400) {
            console.error(await resp.json());
          } else {
            console.error(await resp.text());
          }
        }

        $project.activities.splice(insertionIndex, 0, await resp.json());
      }
    } else if (type === activityTypes.EDIT) {
      if ($project.id == null) {
        // If the project does not exist on the backend yet
        $project.activities.splice(insertionIndex, 1, detail.activity);
      } else {
        const activityID = detail.activity.id;
        delete detail.activity.id;
        const resp = await api.patch(
          `/projects/${$project.id}/activities/${activityID}`,
          { data: detail.activity },
        );

        if (!resp.ok) {
          if (resp.status === 400) {
            console.error(await resp.json());
          } else {
            console.error(await resp.text());
          }
        } else {
          detail.activity.id = activityID;
          $project.activities.splice(
            $project.activities.findIndex(act => act.id === activityID),
            1,
            detail.activity,
          );
        }
      }
    }
    $project.activities = $project.activities;
  }

  async function processActivityDeletion({ detail: activityID }) {
    if ($project.id != null) {
      const resp = await api.del(`/projects/${$project.id}/activities/${activityID}`);
      if (!resp.ok) {
        if (resp.status === 400) {
          console.error(await resp.json());
        } else {
          console.error(await resp.text());
        }
        // Do not delete the activity if the backend responded with an error
        return;
      }
    }
    $project.activities = $project.activities.filter(act => act.id !== activityID);
  }
</script>

<svelte:head>
  <title>Create Project – Innopoints</title>

  <link rel="stylesheet" href="css/create-project/steps.css">
  <link rel="stylesheet" href="css/create-project/main.css">
  <link rel="stylesheet" href="css/create-project/general.css">
  <link rel="stylesheet" href="css/create-project/activity.css">
  <link rel="stylesheet" href="css/create-project/actions.css">
  <link rel="stylesheet" href="css/page-components/create-activity.css" />
</svelte:head>

<Layout>
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
        {errors}
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
      Not implemented.
    {/if}
  </div>
</Layout>
