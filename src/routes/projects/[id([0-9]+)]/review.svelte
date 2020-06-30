<script context="module">
  import { writable } from 'svelte/store';
  import getInitialData from 'src/utils/get-initial-data.js';
  import { prepareAfterBackend } from 'src/utils/project-manipulation.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['project', `/projects/${page.params.id}`],
      ['competences', '/competences'],
      ['tags', '/tags'],
    ]));

    if (session.account == null || !session.account.is_admin) {
      this.error(403, 'Project Review');
    }

    data.project.activities.forEach(prepareAfterBackend);
    data.account = session.account;
    data.project = writable(data.project);
    return data;
  }
</script>

<script>
  import { setContext } from 'svelte';
  import { SnackbarContainer, H2 } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import ProjectHeader from 'src/containers/projects/view/project-header.svelte';
  import ModeratorView from 'src/containers/projects/view/moderator-view.svelte';
  import StaffCards from 'src/containers/projects/view/staff-cards.svelte';

  setContext('review-mode', true);

  export let project;
  export let account;
  export let competences;
  export let tags;
</script>

<svelte:head>
  <title>Review {$project.name} – Innopoints</title>
</svelte:head>

<SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT}>
  <div class="material">
    <ProjectHeader {project} {account} {tags} />

    <H2 class="padded">Project Staff</H2>
    <StaffCards review {project} {account} />

    <H2 class="padded">Activities</H2>
    <ModeratorView {account} {project} {competences} />
  </div>
</SnackbarContainer>

<style src="../../../../static/css/routes/projects/view/index.scss"></style>
