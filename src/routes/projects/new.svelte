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

  const { page, session } = stores();

  export let drafts;
  export let account;
  $session.user = account;

  let project = writable(null);
  const unsubscribe = project.subscribe(saveProject);
  onDestroy(unsubscribe);
  let errors = {
    name: {
      duplicate: false,
      tooShort: false,
    },
    image: {
      inappropriateFile: false,
      uploadFailed: false,
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

      $project = await resp.json();
      goToStep(1);
    } catch (e) {
      console.error(e);
    }
  }

  function saveProject(project) {
    if (project == null || project.name == null) {
      return;
    }

    if (project.name === '') {
      errors.nameTooShort = true;
      return;
    }
    errors.nameTooShort = false;


    console.log('saving', project);
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
      />
    {/if}
  </div>
</Layout>

<!-- on:error={handleError}
on:error-resolved={handleErrorResolved}
on:sync-project={(e) => project = e.detail}
on:field-change={handleFieldChange} -->
