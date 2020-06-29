<script context="module">
  import getInitialData from 'src/utils/get-initial-data.js';

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
  import Layout from 'src/layouts/default.svelte';
  import { SnackbarContainer } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import StepZero from 'src/containers/projects/new/step-0.svelte';
  import StepOne from 'src/containers/projects/new/step-1.svelte';
  import StepTwo from 'src/containers/projects/new/step-2.svelte';
  import StepThree from 'src/containers/projects/new/step-3.svelte';
  import * as api from 'src/utils/api.js';
  import {
    computeDiffProject,
    copyProject,
  } from 'src/utils/project-manipulation.js';

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
    const diff = computeDiffProject(projectObject, lastSyncedProject);
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
        delete diff.activities;
        await api.json(api.patch(`/projects/${projectObject.id}`, requestOptions));
      } else {
        ({
          id: projectObject.id,
          activities: projectObject.activities,
        } = await api.json(api.post('/projects', requestOptions)));
      }
      autosaved.set(true);
    } catch (e) {
      snackbarContainer && snackbarContainer.showSnackbar({
        props: { text: 'Could not autosave. Some changes might be lost' },
      });
      console.error(e);
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
        <StepZero {project} {drafts} />
      {:else if step === 1}
        <StepOne {project} {autosaved} />
      {:else if step === 2}
        <StepTwo {project} {autosaved} {competences} />
      {:else}
        <StepThree {project} {autosaved} />
      {/if}
    </div>
  </SnackbarContainer>
</Layout>

<style src="../../../static/css/routes/projects/new.scss"></style>
