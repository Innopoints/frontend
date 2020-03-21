<script context="module">
  import getInitialData from '@/utils/get-initial-data.js';

  export async function preload(page, session) {
    return await getInitialData(this, session, new Map([
      ['account', '/account?from_cache=true'],
      ['project', `/projects/${page.params.id}`],
      ['competences', '/competences'],
    ]));
  }
</script>

<script>
  import Layout from '@/layouts/default.svelte';
  import ProjectHeader from '@/containers/projects/view/project-header.svelte';
  import UserActivityCard from '@/components/projects/view/user-activity-card.svelte';
  import ApplicationDialog from '@/components/projects/view/application-dialog.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import * as api from '@/utils/api.js';

  export let project;
  export let account;
  export let competences;
  let appliedActivity = null;
  let applicationDialogOpen = false;
  let applicationDialogError = null;

  const isModeratorView = (
    account != null
    && (account.is_admin || project.moderators.includes(account.email))
  );

  let activityCards;
  $: {
    if (isModeratorView) {
      activityCards = (
        project.activities
          .filter(x => !x.internal)
          .map(act => ({...act, expanded: false}))
      );
    } else {
      activityCards = (
        project.activities
          .filter(x => !x.internal)
          .map(act => {
            act.applications = act.applications.map(apl => ({...apl, expanded: false}));
            return act;
          })
      );
    }
  }

  function showApplicationDialog({ detail: activity }) {
    appliedActivity = activity;
    applicationDialogOpen = true;
  }

  async function processApplication({ detail: { activity, comment, telegram, remember }}) {
    try {
      const response = await api.post(
        `/projects/${activity.project}/activities/${activity.id}/applications`,
        {
          data: {
            telegram,
            comment,
          },
        },
      );

      if (!response.ok) {
        throw response;
      }

      const application = await response.json();
      application.applicant = account;
      activity.existing_application = application;
      activity.applications.push(application);
      project = project;

      if (remember) {
        api.patch('/account/telegram', {
          data: {
            telegram_username: telegram,
          },
        });
      }
      applicationDialogOpen = false;
      applicationDialogError = null;
    } catch (e) {
      applicationDialogError = "The application didn't go through. Please, try again.";
      console.error(e);
    }
  }

  async function processTakeBack({ detail: activity }) {
    try {
      const response = await api.del(
        `/projects/${activity.project}/activities/${activity.id}/applications`,
      );

      if (!response.ok) {
        throw response;
      }

      activity.applications.filter(x => x.id != activity.existing_application.id);
      if (activity.existing_application.status === ApplicationStatuses.APPROVED) {
        activity.vacant_spots++;
      }
      activity.existing_application = null;
      project = project;
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:head>
  <title>{project.name} – Innopoints</title>

  <!-- Styles for View Project page -->
  <link rel="stylesheet" href="css/view-project/main.css" />
  <link rel="stylesheet" href="css/view-project/activity.css" />
  <link rel="stylesheet" href="css/view-project/activity-user.css" />
  <link rel="stylesheet" href="css/view-project/activity-moderated.css" />
  <link rel="stylesheet" href="css/view-project/activity-finalizing.css" />
  <link rel="stylesheet" href="css/page-components/create-activity.css" />
  <link rel="stylesheet" href="css/view-project/moderators.css" />
  <link rel="stylesheet" href="css/view-project/proper-grid.css" />
  <link rel="stylesheet" href="css/view-project/report-performance-modal.css" />
  <link rel="stylesheet" href="css/view-project/apply-modal.css" />
  <link rel="stylesheet" href="css/page-components/empty-state.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <ProjectHeader {project} />

    <h2 class="padded">Activities</h2>
    <div class="activities user padded">
      {#each activityCards as activity (activity.id)}
        <UserActivityCard
          {activity}
          {competences}
          {account}
          on:apply={showApplicationDialog}
          on:take-back-application={processTakeBack}
        />
      {/each}
    </div>
  </div>
  {#if !isModeratorView}
    <ApplicationDialog
      savedUsername={account.telegram_username}
      activity={appliedActivity}
      bind:isOpen={applicationDialogOpen}
      on:submit-application={processApplication}
      error={applicationDialogError}
    />
  {/if}
</Layout>
