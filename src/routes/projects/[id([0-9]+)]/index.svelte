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
  import { writable } from 'svelte/store';
  import { goto, prefetch } from '@sapper/app';
  import Layout from '@/layouts/default.svelte';
  import ProjectHeader from '@/containers/projects/view/project-header.svelte';
  import UserView from '@/containers/projects/view/user-view.svelte';
  import ModeratorView from '@/containers/projects/view/moderator-view.svelte';
  import ModeratorHourPanel from '@/containers/projects/view/moderator-hour-panel.svelte';
  import ApplicationDialog from '@/components/projects/view/application-dialog.svelte';
  import ReportDialog from '@/components/projects/view/report-dialog.svelte';
  import DangerConfirmDialog from '@/components/projects/view/danger-confirm-dialog.svelte';
  import FinalizingDialog from '@/components/projects/view/finalizing-dialog.svelte';
  import FeedbackModal from '@/components/projects/view/feedback-modal.svelte';
  import LeaveFeedbackModal from '@/components/projects/view/leave-feedback-modal.svelte';
  import ReportPerformanceModal from '@/components/projects/view/report-performance-modal.svelte';
  import ApplicationStatuses from '@/constants/backend/application-statuses.js';
  import ActivityTypes from '@/constants/projects/activity-internal-types.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';
  import * as api from '@/utils/api.js';
  import {
    determineInsertionIndex,
    prepareForBackend,
    prepareAfterBackend,
  } from '@/utils/project-manipulation.js';

  export let project;
  export let account;
  export let competences;

  const projectStore = writable(project);
  const isModeratorView = (
    account != null
    && (account.is_admin || project.moderators.includes(account.email))
  );

  const applicationDialog = {
    open: false,
    error: null,
    activity: null,
    show({ detail: activity }) {
      applicationDialog.activity = activity;
      applicationDialog.open = true;
    },
    async processApplication({ detail }) {
      const { activity, comment, telegram, remember } = detail;
      try {
        const application = await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}/applications`,
          { data: { telegram, comment } },
        ));
        application.applicant = account;
        activity.existing_application = application;
        project = project;
        projectStore.set(project);

        if (remember) {
          api.patch('/account/telegram', { data: { telegram_username: telegram } });
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
        ));

        if (activity.existing_application.status === ApplicationStatuses.APPROVED) {
          activity.applications.filter(x => x.id != activity.existing_application.id);
          activity.vacant_spots++;
        }
        activity.existing_application = null;
        project = project;
        projectStore.set(project);
        applicationTakeBackDialog.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  const activityDeletionDialog = {
    open: false,
    activity: null,
    show({ detail: activity }) {
      activityDeletionDialog.activity = activity;
      activityDeletionDialog.open = true;
    },
    async deleteActivity({ detail: activity }) {
      activityDeletionDialog.open = false;
      try {
        await api.json(api.del(`/projects/${activity.project}/activities/${activity.id}`));
        project.activities = project.activities.filter(act => act.id !== activity.id);
        projectStore.set(project);
      } catch (e) {
        console.error(e);
      }
    },
    restoreActivity({ detail: activity }) {
      activity._type = ActivityTypes.DISPLAY;
      activityDeletionDialog.activity = null;
    },
  };

  const reportDialog = {
    open: false,
    props: null,
    show({ detail: props }) {
      reportDialog.props = props;
      reportDialog.open = true;
    },
  };

  const projectDeletionDialog = {
    open: false,
    show() {
      projectDeletionDialog.open = true;
    },
    async deleteProject() {
      try {
        prefetch('/projects');
        await api.json(api.del(`/projects/${project.id}`));
        goto('/projects');
      } catch (e) {
        console.error(e);
      }
    },
  };

  const finalizeDialog = {
    open: false,
    show() {
      finalizeDialog.open = true;
    },
    async finalizeProject() {
      try {
        await api.json(api.patch(`/projects/${project.id}/finalize`));
        project = await api.json(api.get(`/projects/${project.id}`));
        projectStore.set(project);
        finalizeDialog.open = false;
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
    show({ detail: activity }) {
      leaveFeedbackModal.activity = activity;
      leaveFeedbackModal.open = true;
    },
    async submitFeedback({ detail }) {
      try {
        const { value, activity, application } = detail;
        value.answers = value.answers.map(answer => answer || '');
        application.feedback = await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}`
          + `/applications/${application.id}/feedback`,
          { data: value },
        ));
        project = project;
        leaveFeedbackModal.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  const reportPerformanceModal = {
    open: false,
    show({ detail }) {
      reportPerformanceModal.activity = detail.activity;
      reportPerformanceModal.application = detail.application;
      reportPerformanceModal.open = true;
    },
    async submitReport({ detail }) {
      try {
        const { value, activity, application } = detail;
        application.reports.push(await api.json(api.post(
          `/projects/${activity.project}/activities/${activity.id}`
          + `/applications/${application.id}/report`,
          { data: value },
        )));
        project = project;
        projectStore.set(project);
        reportPerformanceModal.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  async function changeApplicationStatus({ detail: { status, activity, application } }) {
    try {
      await api.json(api.patch(
        `/projects/${activity.project}/activities/${activity.id}/applications/${application.id}`,
        { data: { status } },
      ));

      if (status === ApplicationStatuses.APPROVED) {
        activity.vacant_spots--;
      } else if (application.status === ApplicationStatuses.APPROVED) {
        activity.vacant_spots++;
      }

      application.status = status;
      project = project;
      projectStore.set(project);
    } catch (e) {
      console.error(e);
    }
  }

  async function processActivityChange({ detail }) {
    const type = detail.activityCopy._type;
    delete detail.activityCopy._type;
    prepareForBackend(detail.activityCopy);

    const index = determineInsertionIndex(project.activities, detail.position);

    let updatedActivity;
    try {
      if (type === ActivityTypes.NEW) {
        updatedActivity = await api.json(api.post(`/projects/${project.id}/activities`, {
          data: detail.activityCopy,
        }));
        prepareAfterBackend(updatedActivity);
        project.activities.splice(index, 0, updatedActivity);
      } else if (type === ActivityTypes.EDIT) {
        const activityID = detail.activityCopy.id;
        delete detail.activityCopy.id;

        updatedActivity = await api.json(api.patch(
          `/projects/${project.id}/activities/${activityID}`,
          { data: detail.activityCopy },
        ));
        prepareAfterBackend(updatedActivity);
        updatedActivity.id = activityID;

        project.activities.splice(
          project.activities.findIndex(act => act.id === activityID),
          1,
          updatedActivity,
        );
      }
    } catch (e) {
      console.error(e);
    }
    project.activities = project.activities;
    projectStore.set(project);
  }

  async function updateHours({ detail }) {
    try {
      const { application, hours, activity } = detail;
      await api.json(api.patch(
        `/projects/${project.id}/activities/${activity.id}/applications/${application.id}`,
        { data: { actual_hours: hours } },
      ));
      application.actual_hours = hours;
      project = project;
    } catch (e) {
      console.error(e);
    }
  }

  async function submitForReview() {
    try {
      await api.json(api.patch(`/projects/${project.id}/request_review`));
      project.review_status = ReviewStatuses.PENDING;
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
  <link rel="stylesheet" href="css/review-project/main.css" />
  <link rel="stylesheet" href="css/page-components/create-activity.css" />
  <link rel="stylesheet" href="css/view-project/moderators.css" />
  <link rel="stylesheet" href="css/view-project/proper-grid.css" />
  <link rel="stylesheet" href="css/view-project/report-performance-modal.css" />
  <link rel="stylesheet" href="css/view-project/read-feedback-modal.css" />
  <link rel="stylesheet" href="css/profile/leave-feedback-modal.css" />
  <link rel="stylesheet" href="css/view-project/apply-modal.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
</svelte:head>

<Layout user={account}>
  <div class="material">
    <ProjectHeader
      {project}
      {account}
      on:delete-project={projectDeletionDialog.show}
      on:finalize-project={finalizeDialog.show}
      on:submit-for-review={submitForReview}
    />

    {#if (project.lifetime_stage === ProjectStages.FINALIZING
       || project.lifetime_stage === ProjectStages.FINISHED)
       && account != null
       && (project.moderators.includes(account.email) || account.is_admin)}
       <h2 class="padded">Project Staff</h2>
       <ModeratorHourPanel {project} on:save-hours={updateHours} />
    {/if}

    {#if project.activities.find(x => !x.internal) != null || isModeratorView}
      <h2 class="padded">Activities</h2>
      {#if isModeratorView}
        <ModeratorView
          {account}
          activities={project.activities}
          project={projectStore}
          {competences}
          on:view-reports={reportDialog.show}
          on:application-status-changed={changeApplicationStatus}
          on:activity-changed={processActivityChange}
          on:delete-activity={activityDeletionDialog.show}
          on:save-hours={updateHours}
          on:read-feedback={feedbackModal.show}
          on:report-performance={reportPerformanceModal.show}
        />
      {:else}
        <UserView
          activities={project.activities}
          {competences}
          {account}
          projectStage={project.lifetime_stage}
          on:apply={applicationDialog.show}
          on:take-back-application={applicationTakeBackDialog.show}
          on:read-feedback={feedbackModal.show}
          on:leave-feedback={leaveFeedbackModal.show}
        />
      {/if}
    {/if}
  </div>

  {#if isModeratorView}
    <!-- view past reports* -->
    <ReportDialog {project} bind:isOpen={reportDialog.open} {...reportDialog.props} />
    <!-- confirm-project-deletion -->
    <DangerConfirmDialog
      textYes="yes, delete"
      bind:isOpen={projectDeletionDialog.open}
      on:confirm={projectDeletionDialog.deleteProject}
    >
      Deleting a project is rarely desired. <br />
      You may edit the project or delete individual activities instead. <br />
      Think twice before proceeding.
    </DangerConfirmDialog>
    <!-- confirm-activity-deletion -->
    <DangerConfirmDialog
      textYes="yes, delete"
      bind:isOpen={activityDeletionDialog.open}
      eventDetail={activityDeletionDialog.activity}
      on:confirm={activityDeletionDialog.deleteActivity}
      on:reject={activityDeletionDialog.restoreActivity}
    >
      Are you sure you want to delete this activity?
      <em class="consequences">
        All of the volunteering applications will be discarded.
      </em>
    </DangerConfirmDialog>
    <!-- confirm-project-finish -->
    <FinalizingDialog
      bind:isOpen={finalizeDialog.open}
      on:confirm={finalizeDialog.finalizeProject}
    />
    <!-- report-performance -->
    <ReportPerformanceModal
      bind:isOpen={reportPerformanceModal.open}
      activity={reportPerformanceModal.activity}
      application={reportPerformanceModal.application}
      on:submit={reportPerformanceModal.submitReport}
    />
  {:else}
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
    bind:isOpen={leaveFeedbackModal.open}
    activity={leaveFeedbackModal.activity}
    {competences}
    on:submit={leaveFeedbackModal.submitFeedback}
  />
</Layout>
<!-- view past reports* -->
<!-- confirm application rejection -->
<!-- confirm application pending -->
