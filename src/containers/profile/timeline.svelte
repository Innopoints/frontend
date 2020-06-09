<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Loading } from 'attractions';
  import EmptyState from '@/components/common/empty-state.svelte';
  import TimelineEntry from '@/components/profile/timeline-entry.svelte';
  import LeaveFeedbackModal from '@/components/projects/view/leave-feedback-modal.svelte';
  import * as api from '@/utils/api.js';

  export let timelinePromises;
  export let competences;
  export let account;

  function requestMore() {
    dispatch('more-timeline');
  }

  const leaveFeedbackModal = {
    open: false,
    activity: null,
    application: null,
    payload: null,
    async show({ detail: timelinePayload }) {
      try {
        leaveFeedbackModal.payload = timelinePayload;
        const project = await api.json(api.get(`/projects/${timelinePayload.project_id}`));
        leaveFeedbackModal.activity = project.activities.find(
          act => act.id === timelinePayload.activity_id,
        );
        leaveFeedbackModal.application = leaveFeedbackModal.activity.applications.find(
          apl => apl.id === timelinePayload.application_id,
        );
        leaveFeedbackModal.open = true;
      } catch (e) {
        console.error(e);
      }
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
        leaveFeedbackModal.payload.feedback_id = application.id;
        timelinePromises = timelinePromises;
        account.balance += leaveFeedbackModal.payload.reward;
        leaveFeedbackModal.open = false;
      } catch (e) {
        console.error(e);
      }
    },
  };

  const dispatch = createEventDispatcher();
</script>

<div class="timeline">
  {#if timelinePromises}
    {#each timelinePromises as promise}
      {#await promise.then(value => value.data)}
        <div class="loading">
          <Loading />
          <p>Loading...</p>
        </div>
      {:then timelineFragment}
        {#each timelineFragment as entry}
          <TimelineEntry {...entry} on:leave-feedback={leaveFeedbackModal.show} />
        {/each}
      {/await}
    {/each}

    {#await Promise.all(timelinePromises).then(values => values[values.length - 1]) then lastValue}
      {#if lastValue != null && lastValue.more}
        <Button class="more" on:click={requestMore}>
          <svg src="images/icons/more-horizontal.svg" class="icon mr-2" />
          load more
        </Button>
      {/if}
    {/await}
  {:else}
    <EmptyState small text="No recent events" subtext="How about some volunteering?">
      <svg src="images/icons/list.svg" class="icon" />
    </EmptyState>
  {/if}
</div>
<LeaveFeedbackModal
  bind:open={leaveFeedbackModal.open}
  activity={leaveFeedbackModal.activity}
  application={leaveFeedbackModal.application}
  {competences}
  on:submit={leaveFeedbackModal.submitFeedback}
/>

<style src="../../../static/css/containers/profile/timeline.scss"></style>
