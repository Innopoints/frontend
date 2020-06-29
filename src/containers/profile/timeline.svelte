<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Button, Loading } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import EmptyState from 'src/components/common/empty-state.svelte';
  import TimelineEntry from 'src/components/profile/timeline-entry.svelte';
  import LeaveFeedbackModal from 'src/components/projects/view/leave-feedback-modal.svelte';
  import * as api from 'src/utils/api.js';

  export let timelinePromises;
  export let competences;

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
        showSnackbar({ props: { text: 'Couldn\'t get information about the project' } });
        console.error(e);
      }
    },
  };

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<div class="timeline">
  {#if timelinePromises.length !== 0}
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
/>

<style src="../../../static/css/containers/profile/timeline.scss"></style>
