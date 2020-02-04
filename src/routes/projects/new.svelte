<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['drafts', `/projects/drafts`],
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
  import StepThree from '@/containers/projects/new/step-3.svelte';
  import * as api from '@/utils/api.js';
  import generateQueryString from '@/utils/generate-query-string.js';
  import { filterProjectFields } from './_project-manipulation.js';

  const { page, session } = stores();

  export let drafts;
  export let account;
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
  const stepComponents = [StepZero, StepOne, StepTwo, StepThree];

  function goToStep(stepIdx) {
    goto(`/projects/new?step=${stepIdx}`);
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
      lastSyncedName = draftProject.name;
      $project = draftProject;
      goToStep(1);
    } catch (e) {
      console.error(e);
    }
  }

  async function saveProject(project) {
    if (project == null || project.name == null) {
      return;
    }

    if (project.name === '' || project.organizer === '') {
      return;
    }

    if (project.name !== lastSyncedName) {
      const queryString = generateQueryString(new Map([['name', project.name]]));
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

    lastSyncedName = project.name;

    if (project.id != null) {
      const resp = await api.patch('/projects/' + project.id, {
        data: filterProjectFields(project, true),
      });
      if (resp.ok) {
        autosaved.set(true);
      } else if (resp.status === 400) {
        console.error(await resp.json());
      } else {
        console.error(await resp.text());
      }
    }
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
    {:else}
      <svelte:component
        this={stepComponents[step]}
        {project}
        {errors}
        {autosaved}
      />
    {/if}
  </div>
</Layout>
