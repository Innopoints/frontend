<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dot from 'ui/dot.svelte';
  import Labeled from 'ui/labeled.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';
  import { API_HOST } from '@/constants/env.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';

  export let project;
  export let account;

  const projectImageURL = (
    project.image_id == null ?
      '/images/create-project/placeholder.svg'
    : `${API_HOST}/file/${project.image_id}`
  );

  $: reviewAllowed = project.activities.every(
    activity =>
      activity.applications != null && activity.applications.every(
        application =>
          application.actual_hours > 0,
      ),
  );

  const dispatch = createEventDispatcher();
</script>

<header
  class="project-header"
  class:wrap={project.lifetime_stage === ProjectStages.FINALIZING}
  style="--image-url: url({projectImageURL})"
>
  <img src={projectImageURL} class="cover-image" alt="Project cover image" />
  <div class="info">
    <h1>
      {project.name}
      {#if project.lifetime_stage === ProjectStages.FINISHED}
        <div class="status-chip">
          finished
        </div>
      {/if}
    </h1>
    <div class="data-points">
      <Labeled icon label="When">
        <svg slot="icon" class="icon" src="images/icons/calendar.svg" />
        {formatDateRange({ start: project.start_date, end: project.end_date })}
      </Labeled>
      <Labeled icon label="Organizer">
        <svg slot="icon" class="icon" src="images/icons/user.svg" />
        {project.organizer}
        {#if account && account.is_admin}
          <a href="mailto:{project.creator}" class="secondary">
            contact project creator
          </a>
        {/if}
      </Labeled>
      {#if project.lifetime_stage === ProjectStages.FINALIZING}
        {#if project.review_status != null}
          <Labeled icon label="Review status">
            <svg slot="icon" class="icon" src="images/icons/flag.svg" />
            <div>
              {#if project.review_status === ReviewStatuses.PENDING}
                Pending <Dot pending small />
              {:else if project.review_status === ReviewStatuses.REJECTED}
                Rejected <Dot attention small />
              {/if}
            </div>
          </Labeled>
        {/if}
        {#if project.admin_feedback != null}
          <Labeled icon label="Administrator's feedback">
            <svg slot="icon" class="icon" src="images/icons/message-square.svg" />
            {project.admin_feedback}
          </Labeled>
        {/if}
      {/if}
    </div>
    {#if account != null && (project.creator === account.email || account.is_admin)}
      <div class="actions">
        {#if project.lifetime_stage === ProjectStages.ONGOING}
          <Button isOutline>
            <svg class="icon mr" src="images/icons/edit.svg" />
            edit
          </Button>
          <Button isOutline isDanger on:click={() => dispatch('delete-project')}>
            <svg class="icon mr" src="images/icons/trash-2.svg" />
            delete
          </Button>
          <Button isOutline classname="finalize" on:click={() => dispatch('finalize-project')}>
            <svg class="icon mr" src="images/icons/check-circle.svg" />
            finalize
          </Button>
          {#if account && account.is_admin && project.lifetime_stage === ProjectStages.FINALIZING}
            <Button isOutline classname="review">
              <svg class="icon mr" src="images/icons/clipboard.svg" />
              review
            </Button>
          {/if}
        {:else if project.lifetime_stage === ProjectStages.FINALIZING
               && project.review_status != ReviewStatuses.PENDING}
          <Button
            isFilled
            disabled={!reviewAllowed}
            tooltip={reviewAllowed ? '' : 'Fill out the hours for the project staff first.'}
            on:click={() => dispatch('submit-for-review')}
          >
            <svg class="icon mr" src="images/icons/check-circle.svg" />
            submit for review
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</header>
