<script context="module">
  import { writable } from 'svelte/store';
  import getInitialData from '@/utils/get-initial-data.js';
  import { prepareAfterBackend } from '@/utils/project-manipulation.js';

  export async function preload(page, session) {
    const data = await getInitialData(this, session, new Map([
      ['project', `/projects/${page.params.id}`],
      ['competences', '/competences'],
      ['tags', '/tags'],
    ]));
    data.project.activities.forEach(prepareAfterBackend);
    data.account = session.account;
    data.project = writable(data.project);
    return data;
  }
</script>

<script>
  import { setContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { SnackbarContainer, H2 } from 'attractions';
  import { SnackbarPositions } from 'attractions/snackbar';
  import Layout from '@/layouts/default.svelte';
  import ProjectHeader from '@/containers/projects/view/project-header.svelte';
  import UserView from '@/containers/projects/view/user-view.svelte';
  import ModeratorView from '@/containers/projects/view/moderator-view.svelte';
  import StaffCards from '@/containers/projects/view/staff-cards.svelte';
  import ApplicationDialog from '@/components/projects/view/application-dialog.svelte';
  import DangerConfirmDialog from '@/components/projects/view/danger-confirm-dialog.svelte';
  import FeedbackModal from '@/components/projects/view/feedback-modal.svelte';
  import LeaveFeedbackModal from '@/components/projects/view/leave-feedback-modal.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import * as api from '@/utils/api.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';

  const { session } = stores();
  setContext('review-mode', false);

  export let project;
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
  $: externalActivities = $project.activities.filter(act => !act.internal);

  const applicationDialog = {
    open: false,
    error: null,
    activity: null,
    show({ detail: activity }) {
      applicationDialog.activity = activity;
      applicationDialog.open = true;
    },
    async processApplication({ detail }) {
      const { activity, comment, telegram } = detail;
      try {
        const application = await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}/applications`,
          { data: { telegram, comment }, csrfToken: account.csrf_token },
        ));
        application.applicant = account;
        activity.existing_application = application;
        project = project;

        if (telegram && telegram != account.telegram) {
          try {
            await api.json(api.patch(
              '/account/telegram',
              { data: { telegram_username: telegram }, csrfToken: account.csrf_token },
            ));
            account.telegram = telegram;
            $session.account = account;
          } catch (e) {
            console.error(e);
          }
        }
        applicationDialog.open = false;
        applicationDialog.error = null;
      } catch (e) {
        applicationDialog.error = "The application didn't go through. Please, try again.";
        console.error(e);
      }
    },
  };

  const applicationTakeBackDialog = {
    open: false,
    activity: null,
    show({ detail: activity }) {
      applicationTakeBackDialog.activity = activity;
      applicationTakeBackDialog.open = true;
    },
    async processTakeBack({ detail: activity }) {
      try {
        await api.json(api.del(
          `/projects/${activity.project}/activities/${activity.id}/applications`,
          { csrfToken: account.csrf_token },
        ));

        if (activity.existing_application.status === ApplicationStatuses.APPROVED) {
          activity.applications.filter(x => x.id != activity.existing_application.id);
          activity.vacant_spots++;
        }
        activity.existing_application = null;
        project = project;
        applicationTakeBackDialog.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  const feedbackModal = {
    open: false,
    activity: null,
    feedback: null,
    from: null,
    show({ detail }) {
      feedbackModal.activity = detail.activity;
      feedbackModal.feedback = detail.feedback;
      feedbackModal.from = detail.from;
      feedbackModal.open = true;
    },
  };

  const leaveFeedbackModal = {
    open: false,
    activity: null,
    application: null,
    show({ detail }) {
      leaveFeedbackModal.activity = detail.activity;
      leaveFeedbackModal.application = detail.application;
      leaveFeedbackModal.open = true;
    },
    async submitFeedback({ detail }) {
      try {
        const { value, activity, application } = detail;
        value.answers = value.answers.map(answer => answer || '');
        application.feedback = await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}`
          + `/applications/${application.id}/feedback`,
          { data: value, csrfToken: account.csrf_token },
        ));
        project = project;
        leaveFeedbackModal.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };
</script>

<svelte:head>
  <title>{$project.name} – Innopoints</title>
  <meta name="og:title" content={$project.name} />
  <meta name="og:url" content="https://ipts.innopolis.university/projects/{$project.id}" />
  <meta
    name="og:description"
    content="Available activities: {$project.activities.slice(0, 3).filter(activity => !activity.internal).map(activity => activity.name).join(', ')}{$project.activities.length > 3 ? ', ...' : '.'}"
  />
  {#if $project.image_id}
    <meta name="og:image" content="{API_HOST_BROWSER}/file/{$project.image_id}" />
  {/if}
</svelte:head>

<Layout user={account}>
  <SnackbarContainer position={SnackbarPositions.BOTTOM_LEFT}>
    <div class="material">
      <ProjectHeader {project} {account} {tags} {moderatorMode} />

      {#if ($project.lifetime_stage === ProjectStages.FINALIZING
         || $project.lifetime_stage === ProjectStages.FINISHED)
         && account != null
         && (moderatorEmails.includes(account.email) || account.is_admin)}
        <H2 class="padded">Project Staff</H2>
        <StaffCards
          {project}
          {account}
          on:leave-feedback={leaveFeedbackModal.show}
          on:read-feedback={feedbackModal.show}
        />
      {/if}

      {#if externalActivities || moderatorMode}
        <H2 class="padded">Activities</H2>
        {#if moderatorMode}
          <ModeratorView
            {account}
            {project}
            {competences}
            on:read-feedback={feedbackModal.show}
          />
        {:else}
          <UserView
            activities={externalActivities}
            {competences}
            {account}
            projectStage={$project.lifetime_stage}
            on:apply={applicationDialog.show}
            on:take-back-application={applicationTakeBackDialog.show}
            on:read-feedback={feedbackModal.show}
            on:leave-feedback={leaveFeedbackModal.show}
          />
        {/if}
      {/if}
    </div>
  </SnackbarContainer>

  {#if !moderatorMode}
    <!-- apply -->
    <ApplicationDialog
      savedUsername={account && account.telegram_username}
      activity={applicationDialog.activity}
      bind:isOpen={applicationDialog.open}
      on:submit-application={applicationDialog.processApplication}
      error={applicationDialog.error}
    />
    <!-- confirm-application-takeback -->
    <DangerConfirmDialog
      textYes="yes, take back"
      bind:isOpen={applicationTakeBackDialog.open}
      eventDetail={applicationTakeBackDialog.activity}
      on:confirm={applicationTakeBackDialog.processTakeBack}
    >
      Are you sure you want to take your application back?
      <em class="consequences">You may place a new one afterwards.</em>
    </DangerConfirmDialog>
  {/if}
  <!-- read-feedback -->
  <FeedbackModal
    bind:isOpen={feedbackModal.open}
    activity={feedbackModal.activity}
    feedback={feedbackModal.feedback}
    from={feedbackModal.from}
    {competences}
  />
  <!-- leave-feedback -->
  <LeaveFeedbackModal
    bind:open={leaveFeedbackModal.open}
    activity={leaveFeedbackModal.activity}
    application={leaveFeedbackModal.application}
    {competences}
    on:submit={leaveFeedbackModal.submitFeedback}
  />
</Layout>

<style src="../../../../static/css/routes/projects/view/index.scss"></style>
