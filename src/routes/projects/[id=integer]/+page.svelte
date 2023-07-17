<script context="module">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import getInitialData from 'src/utils/get-initial-data.js';
  // import { prepareAfterBackend } from 'src/utils/project-manipulation.js';
  // import ProjectStages from 'src/constants/backend/project-lifetime-stages.js';

  // export async function preload(page, session) {
  //   const data = await getInitialData(this, session, new Map([
  //     ['projectObject', `/projects/${page.params.id}`],
  //     ['competences', '/competences'],
  //     ['tags', '/tags'],
  //   ]));
  //   if (data.projectObject.lifetime_stage === ProjectStages.DRAFT) {
  //     this.redirect(303, '/projects/new');
  //   }
  //   data.projectObject.activities.forEach(prepareAfterBackend);
  //   data.account = session.account;
  //   return data;
  // }
</script>

<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { H2 } from 'attractions';
  import ProjectHeader from 'src/containers/projects/view/project-header.svelte';
  import UserView from 'src/containers/projects/view/user-view.svelte';
  import ModeratorView from 'src/containers/projects/view/moderator-view.svelte';
  import StaffCards from 'src/containers/projects/view/staff-cards.svelte';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  setContext('review-mode', false);

  export let projectObject;
  const project = writable(projectObject);
  export let account;
  export let competences;
  export let tags;

  $: moderatorEmails = (
    Array.isArray($project.moderators) ?
      $project.moderators.map(moderator => moderator.email) : []
  );
  $: moderatorMode = (
    account != null
    && (account.is_admin || moderatorEmails.includes(account.email))
  );
  $: firstActivities = (
    $project.activities
      .filter(activity => !activity.internal && !activity.draft)
      .slice(0, 3)
      .map(activity => activity.name)
      .join(', ')
  );
</script>

<svelte:head>
  <title>{$project.name} – Innopoints</title>
  <meta name="og:title" content={$project.name} />
  <meta name="og:url" content="https://ipts.innopolis.university/projects/{$project.id}" />
  <meta
    name="og:description"
    content="Available activities: {firstActivities}{
      $project.activities.length > 3 ? ', ...' : '.'
    }"
  />
  {#if $project.image_id}
    <meta name="og:image" content="{API_HOST_BROWSER}/file/{$project.image_id}" />
  {/if}
</svelte:head>

<div class="material">
  <ProjectHeader {project} {account} {tags} {moderatorMode} />

  {#if ($project.lifetime_stage === ProjectStages.FINALIZING
        || $project.lifetime_stage === ProjectStages.FINISHED)
       && account != null
       && (moderatorEmails.includes(account.email) || account.is_admin)
  }
    <H2 class="padded">Project Staff</H2>
    <StaffCards {project} {account} {competences} />
  {/if}

  {#if $project.activities.find(act => !act.internal) != null || moderatorMode}
    <H2 class="padded">Activities</H2>
    {#if moderatorMode}
      <ModeratorView {account} {project} {competences} />
    {:else}
      <UserView {account} {project} {competences} />
    {/if}
  {/if}
</div>

<style src="../../../../static/css/routes/projects/view/index.scss"></style>
