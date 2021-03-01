<script>
  import { getContext } from 'svelte';
  import { Card, Dot, Button, Chip } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { s } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import Notice from 'src/components/common/notice.svelte';
  import LeaveFeedbackModal from 'src/components/projects/view/leave-feedback-modal.svelte';
  import ReadFeedbackDialog from 'src/components/projects/view/read-feedback-dialog.svelte';
  import DangerConfirmDialog from 'src/components/common/danger-confirm-dialog.svelte';
  import ApplicationDialog from 'src/components/projects/view/application-dialog.svelte';
  import ApplicationStatuses from 'src/constants/backend/application-statuses.js';
  import ProjectStages from 'src/constants/backend/project-lifetime-stages.js';
  import * as api from 'src/utils/api.js';
  import { formatDate, formatDateRange } from 'src/utils/date-time-format.js';
  import { login } from 'src/utils/auth.js';

  export let projectStage;
  export let activity;
  export let competences;
  export let account;

  $: canApply = (
    projectStage === ProjectStages.ONGOING
    && (
      activity.application_deadline == null
      || new Date(activity.application_deadline) >= new Date()
    ) && (
      activity.people_required == null
      || activity.vacant_spots !== 0
    )
  );

  const leaveFeedbackModal = {
    open: false,
    show() {
      leaveFeedbackModal.open = true;
    },
  };

  const applicationTakeBackDialog = {
    open: false,
    show() {
      applicationTakeBackDialog.open = true;
    },
    async processTakeBack() {
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
        activity = activity;
        applicationTakeBackDialog.open = false;
        showSnackbar({ props: { text: 'Application taken back' } });
      } catch (e) {
        showSnackbar({
          props: {
            text: 'Couldn\'t take back the application, try reloading the page',
          },
        });
        console.error(e);
      }
    },
  };

  const readFeedbackDialog = {
    open: false,
    show() {
      readFeedbackDialog.open = true;
    },
  };

  const applicationDialog = {
    open: false,
    show() {
      applicationDialog.open = true;
    },
  };

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="activity user">
  <Card class={activity.expanded && 'expanded'}>
    <div class="title">{activity.name}</div>
    <div class="row info">
      <Labeled icon label="Reward">
        <svg slot="icon" class="icon mr" src="static/images/icons/gift.svg" />
        <span class="content">
          {activity.reward_rate * activity.working_hours}
          <svg src="static/images/innopoint-sharp.svg" />
        </span>
      </Labeled>
      <Labeled icon label="Worktime">
        <svg slot="icon" class="icon mr" src="static/images/icons/clock.svg" />
        <div class="content">
          <div class="primary">
            {#if activity.fixed_reward}
              as needed
            {:else}
              {activity.working_hours} hour{s(activity.working_hours)}
            {/if}
          </div>
          <div class="secondary">
            {formatDateRange(activity.timeframe)}
          </div>
        </div>
      </Labeled>
    </div>
    {#if activity.application_deadline != null}
      <Notice warning>
        <svg slot="icon" src="static/images/icons/alert-circle.svg" />
        {#if new Date(activity.application_deadline) > new Date()}
          Apply before {formatDate(activity.application_deadline)}!
        {:else}
          No more applications accepted.
        {/if}
      </Notice>
    {/if}
    {#if activity.description}
      <div class="additional description">
        <Labeled icon label="Description">
          <svg slot="icon" class="icon mr" src="static/images/icons/align-left.svg" />
          <span class="content">
            {activity.description}
          </span>
        </Labeled>
      </div>
    {/if}
    <div class="additional chips">
      {#each activity.competences as compID (compID)}
        <Chip outline small>{competences.find(x => x.id === compID).name.toLowerCase()}</Chip>
      {/each}
    </div>
    {#if activity.applications != null}
      {#if activity.applications.length !== 0}
        <Labeled icon class="additional volunteers" label="Accepted volunteers">
          <svg slot="icon" class="icon mr" src="static/images/icons/users.svg" />
          <ul class="actual">
            {#each activity.applications as application (application.id)}
              <li>{application.applicant.full_name}</li>
            {/each}
            <strong>
              {#if activity.people_required != null}
                {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)} left
              {:else}
                the more, the better
              {/if}
            </strong>
          </ul>
        </Labeled>
      {:else}
        <Labeled icon class="additional spots" label="Vacant spots">
          <svg slot="icon" class="icon mr" src="static/images/icons/users.svg" />
          <span class="content">
            {#if activity.people_required != null}
              {activity.vacant_spots || 'no more'} spot{s(activity.vacant_spots)} left
            {:else}
              the more, the better
            {/if}
          </span>
        </Labeled>
      {/if}
    {/if}
    {#if activity.existing_application != null}
      <div class="additional application">
        <div class="label">My Application</div>
        <div class="with-icon comment">
          <svg class="icon" src="static/images/icons/message-square.svg" />
          <div class="text">
            {activity.existing_application.comment || 'No comment.'}
          </div>
        </div>
        {#if activity.existing_application.status === ApplicationStatuses.APPROVED}
          <div class="with-icon">
            <svg class="icon" src="static/images/icons/clock.svg" />
            <div class="text">
              {activity.existing_application.actual_hours}
              actual working hour{s(activity.existing_application.actual_hours)}
            </div>
          </div>
        {/if}
      </div>
      <div class="application-status">
        {#if activity.existing_application.status === ApplicationStatuses.PENDING}
          <Dot info />
          Your application is pending review.
        {:else if activity.existing_application.status === ApplicationStatuses.REJECTED}
          <Dot attention />
          Your application is rejected.
        {:else}
          <Dot success />
          Your application is approved.
        {/if}
      </div>
    {/if}
    <div class="row">
      <Button on:click={() => activity.expanded = !activity.expanded}>
        <svg class="mr chevron" src="static/images/icons/chevron-down.svg" />
        {#if activity.expanded}
          collapse
        {:else}
          expand
        {/if}
      </Button>
      {#if account == null}
        <p class="additional not-logged-in">
          <a on:click|preventDefault={login} href="/login">Log in</a> to apply.
        </p>
      {:else}
        {#if activity.existing_application == null}
          {#if projectStage === ProjectStages.ONGOING}
            <Button
              filled
              class="additional"
              disabled={!canApply}
              on:click={applicationDialog.show}
            >
              apply
            </Button>
            <ApplicationDialog {activity} bind:open={applicationDialog.open} />
          {/if}
        {:else}
          {#if projectStage === ProjectStages.ONGOING}
            <Button danger class="additional" on:click={applicationTakeBackDialog.show}>
              take back
            </Button>
            <DangerConfirmDialog
              textYes="yes, take back"
              bind:open={applicationTakeBackDialog.open}
              on:confirm={applicationTakeBackDialog.processTakeBack}
            >
              Are you sure you want to take your application back?
              <em class="consequences">You may place a new one afterwards.</em>
            </DangerConfirmDialog>
          {:else if 
            projectStage === ProjectStages.FINISHED
            && activity.existing_application.status === ApplicationStatuses.APPROVED
          }
            {#if activity.existing_application.feedback == null}
              <Button filled class="additional" on:click={leaveFeedbackModal.show}>
                claim innopoints
              </Button>
              <LeaveFeedbackModal
                bind:open={leaveFeedbackModal.open}
                {activity}
                application={activity.existing_application}
                {competences}
              />
            {:else}
              <Button outline class="additional" on:click={readFeedbackDialog.show}>
                read feedback
              </Button>
              <ReadFeedbackDialog
                bind:open={readFeedbackDialog.open}
                {activity}
                feedback={activity.existing_application.feedback}
                from={account}
                {competences}
              />
            {/if}
          {/if}
        {/if}
      {/if}
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/view/user-activity-card.scss"></style>
