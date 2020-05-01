<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Labeled from 'ui/labeled.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';

  export let project;
  export let account;
  export let review = false;

  let reviewComment = null;

  const projectImageURL = (
    project.image_id == null ?
      '/images/create-project/placeholder.svg'
    : `${API_HOST_BROWSER}/file/${project.image_id}`
  );

  const dispatch = createEventDispatcher();
</script>

<header
  class="project-header"
  class:wrap={project.lifetime_stage === ProjectStages.FINALIZING || review}
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
    {#if project.lifetime_stage === ProjectStages.FINALIZING
      && !review
      && project.review_status != null}
      <div class="warning">
        {#if project.review_status === ReviewStatuses.PENDING}
          <svg class="icon" src="images/icons/info.svg" />
        {:else if project.review_status === ReviewStatuses.REJECTED}
          <svg class="icon" src="images/icons/alert-circle.svg" />
        {/if}
        <p class="review-notice">
          {#if project.review_status === ReviewStatuses.PENDING}
            The project is now awaiting the administrator's review. <br />
            <a href="/profile" prefetch>Enable notifications in the profile</a> to be up-to-date!
          {:else if project.review_status === ReviewStatuses.REJECTED}
            <strong>The administrator rejected the project.</strong> <br/>
            Make corrections and then submit for review again.
          {/if}
        </p>
      </div>
    {/if}
    <div class="data-points">
      <Labeled icon label="When">
        <svg slot="icon" class="icon" src="images/icons/calendar.svg" />
        {formatDateRange({ start: project.start_date, end: project.end_date })}
      </Labeled>
      <Labeled icon label="Staff">
        <svg slot="icon" class="icon" src="images/icons/user.svg" />
        <div class="staff">
          {#each project.moderators as moderator (moderator.email)}
            <a href="mailto:{moderator.email}">
              {moderator.full_name}
            </a>
          {/each}
        </div>
      </Labeled>
      {#if project.lifetime_stage === ProjectStages.FINALIZING
        && !review
        && project.admin_feedback != null}
        <Labeled icon label="Administrator's feedback" textclass="admin-feedback">
          <svg slot="icon" class="icon" src="images/icons/message-square.svg" />
          {project.admin_feedback}
        </Labeled>
      {/if}
    </div>
    {#if account != null
      && (project.creator.email === account.email || account.is_admin)
      && !review}
      <div class="actions">
        {#if project.lifetime_stage === ProjectStages.ONGOING}
          <Button isOutline href="/projects/{project.id}/edit">
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
        {:else if project.lifetime_stage === ProjectStages.FINALIZING
               && project.review_status !== ReviewStatuses.PENDING}
          <Button
            isFilled
            on:click={() => dispatch('submit-for-review')}
          >
            <svg class="icon mr" src="images/icons/check-circle.svg" />
            submit for review
          </Button>
        {/if}
        {#if account
          && account.is_admin
          && project.lifetime_stage === ProjectStages.FINALIZING
          && project.review_status === ReviewStatuses.PENDING}
          <Button
            isOutline
            classname="review"
            href="/projects/{project.id}/review"
          >
            <svg class="icon mr" src="images/icons/clipboard.svg" />
            review
          </Button>
        {/if}
      </div>
    {/if}
    {#if review}
      <div class="review-verdict">
        {#if project.lifetime_stage != ProjectStages.FINALIZING
          || project.review_status != ReviewStatuses.PENDING}
          <div class="title">Review not available.</div>
        {:else}
          <div class="title">Review verdict</div>
          <TextField
            multiline
            maxlength={1024}
            bind:value={reviewComment}
            placeholder="Leave feedback on the project"
          />
          <div class="actions">
            <Button
              isDanger
              on:click={() => dispatch('submit-review', { accept: false, comment: reviewComment })}
            >
              reject
            </Button>
            <Button
              on:click={() => dispatch('submit-review', { accept: true, comment: reviewComment })}
            >
              accept
            </Button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</header>
