<script>
  import { getContext } from 'svelte';
  import { Card, TextField, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import Labeled from 'ui/labeled.svelte';
  import LeaveFeedbackModal from '@/components/projects/view/leave-feedback-modal.svelte';
  import FeedbackModal from '@/components/projects/view/feedback-modal.svelte';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import s from '@/utils/plural-s.js';
  import * as api from '@/utils/api.js';

  export let account;
  export let moderator;
  export let moderation;
  export let project;
  export let competences;

  const review = getContext('review-mode');
  const isCreator = moderator.email === $project.creator.email;
  const application = moderation.applications.find(
    appl => appl.applicant.email === moderator.email,
  );
  let enteredHours = application.actual_hours;

  const leaveFeedbackModal = {
    open: false,
    show() {
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

  const feedbackModal = {
    open: false,
    show() {
      feedbackModal.open = true;
    },
  };

  async function updateHours({ detail }) {
    try {
      await api.json(api.patch(
        `/projects/${$project.id}/activities/${moderation.id}/applications/${application.id}`,
        { data: { actual_hours: enteredHours }, csrfToken: account.csrf_token },
      ));
      application.actual_hours = enteredHours;
      showSnackbar({ props: { text: 'Updated hours successfully' } });
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t update hours, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Card>
  <div class="name">
    {moderator.full_name}
    {#if isCreator}
      <svg class="star" src="images/icons/star.svg" />
    {/if}
  </div>
  {#if $project.lifetime_stage === ProjectStages.FINALIZING && !review}
    <Labeled class="mt" label="Working hours">
      <form class="edit-hours">
        <TextField
          type="number"
          placeholder="1"
          min={0}
          max={99999}
          bind:value={enteredHours}
        />
        {#if enteredHours !== application.actual_hours}
          <Button
            filled
            disabled={enteredHours < 0}
            on:click={updateHours}
          >
            <svg class="mr" src="images/icons/check.svg" />
            save
          </Button>
        {/if}
      </form>
    </Labeled>
  {:else}
    <Labeled class="mt" label="Working hours">
      {application.actual_hours} hour{s(application.actual_hours)}
    </Labeled>
    {#if application.feedback != null && !review}
      <Button outline class="mt" on:click={feedbackModal.show}>read feedback</Button>
      <FeedbackModal
        bind:open={feedbackModal.open}
        activity={moderation}
        feedback={application.feedback}
        from={application.applicant}
        {competences}
      />
    {:else if application.applicant.email === account.email && !review}
      <Button filled class="mt" on:click={leaveFeedbackModal.show}>leave feedback</Button>
      <LeaveFeedbackModal
        bind:open={leaveFeedbackModal.open}
        activity={moderation}
        {application}
        {competences}
        on:submit={leaveFeedbackModal.submitFeedback}
      />
    {/if}
  {/if}
</Card>

<style src="../../../../static/css/components/projects/view/staff-card.scss"></style>
