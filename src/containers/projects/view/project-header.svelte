<script>
  import { getContext } from 'svelte';
  import { goto } from '@sapper/app';
  import { Button, H1, Chip } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import Labeled from 'src/components/common/labeled.svelte';
  import Notice from 'src/components/common/notice.svelte';
  import TagSelector from 'src/components/projects/view/tag-selector.svelte';
  import ReviewVerdict from 'src/components/projects/review/review-verdict.svelte';
  import FinalizingDialog from 'src/components/projects/view/finalizing-dialog.svelte';
  import DangerConfirmDialog from 'src/components/common/danger-confirm-dialog.svelte';
  import { API_HOST_BROWSER } from 'src/constants/env.js';
  import ProjectStages from 'src/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from 'src/constants/backend/project-review-statuses.js';
  import { formatDateRange } from 'src/utils/date-time-format.js';
  import * as api from 'src/utils/api.js';

  export let project;
  export let account;
  export let tags;
  export let moderatorMode = false;

  let finalizeDialogOpen = false;
  let projectDeletionDialogOpen = false;
  const reviewView = getContext('review-mode');

  $: projectImageURL = (
    $project.image_id == null ?
      '/images/create-project/placeholder.svg'
      : `${API_HOST_BROWSER}/file/${$project.image_id}`
  );

  async function saveTags({ detail: tagIDs }) {
    try {
      await api.json(api.patch(`/projects/${$project.id}/tags`, {
        csrfToken: account.csrf_token,
        data: tagIDs,
      }));
      $project.tags = tagIDs;
      showSnackbar({ props: { text: 'Tags successfully updated' } });
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  async function submitForReview() {
    try {
      await api.json(api.patch(
        `/projects/${$project.id}/request_review`,
        { csrfToken: account.csrf_token },
      ));
      $project.review_status = ReviewStatuses.PENDING;
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  async function deleteProject() {
    try {
      await api.json(api.del(`/projects/${$project.id}`, { csrfToken: account.csrf_token }));
      goto('/projects');
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<header
  class="project-header wrap"
  style="--image-url: url({projectImageURL})"
>
  <img loading="lazy" src={projectImageURL} class="cover-image" alt="Project cover" />
  <div class="info">
    <H1>
      {$project.name}
      {#if $project.lifetime_stage === ProjectStages.FINISHED}
        <Chip small>finished</Chip>
      {/if}
    </H1>
    {#if $project.lifetime_stage === ProjectStages.FINALIZING
         && !reviewView
         && moderatorMode
         && $project.review_status != null}
      <Notice warning>
        <div slot="icon">
          {#if $project.review_status === ReviewStatuses.PENDING}
            <svg class="icon" src="static/images/icons/info.svg" />
          {:else if $project.review_status === ReviewStatuses.REJECTED}
            <svg class="icon" src="static/images/icons/alert-circle.svg" />
          {/if}
        </div>
        {#if $project.review_status === ReviewStatuses.PENDING}
          The project is now awaiting the administrator's review. <br />
          <a href="/profile" sapper:prefetch>Enable notifications in the profile</a> to be up-to-date!
        {:else if $project.review_status === ReviewStatuses.REJECTED}
          <strong>The administrator rejected the project.</strong> <br/>
          Make corrections and then submit for review again.
        {/if}
      </Notice>
    {/if}
    {#if $project.lifetime_stage !== ProjectStages.FINISHED && moderatorMode}
      <TagSelector {tags} value={$project.tags} on:change={saveTags} />
    {/if}
    <div class="data-points">
      <Labeled icon label="When">
        <svg slot="icon" class="icon mr" src="static/images/icons/calendar.svg" />
        <div class="date-range">
          {formatDateRange({ start: $project.start_date, end: $project.end_date })}
        </div>
      </Labeled>
      <Labeled icon label="Staff">
        <svg slot="icon" class="icon mr" src="static/images/icons/user.svg" />
        <div class="staff">
          {#each $project.moderators as moderator (moderator.email)}
            <a href="mailto:{moderator.email}">
              {moderator.full_name}
            </a>
          {/each}
        </div>
      </Labeled>
      {#if $project.lifetime_stage === ProjectStages.FINALIZING
           && !reviewView
           && moderatorMode
           && $project.admin_feedback != null}
        <Labeled icon label="Administrator's feedback">
          <svg slot="icon" class="icon mr" src="static/images/icons/message-square.svg" />
          <div class="admin-feedback">
            {$project.admin_feedback}
          </div>
        </Labeled>
      {/if}
    </div>
    {#if account != null
         && ($project.creator.email === account.email || account.is_admin)
         && !reviewView}
      <div class="actions">
        {#if $project.lifetime_stage === ProjectStages.ONGOING}
          <Button outline href="/projects/{$project.id}/edit">
            <svg class="mr" src="static/images/icons/edit.svg" />
            edit
          </Button>
          <Button outline danger on:click={() => projectDeletionDialogOpen = true}>
            <svg class="mr" src="static/images/icons/trash-2.svg" />
            delete
          </Button>
          <Button outline class="finalize" on:click={() => finalizeDialogOpen = true}>
            <svg class="mr" src="static/images/icons/check-circle.svg" />
            the event is over
          </Button>
        {:else if $project.lifetime_stage === ProjectStages.FINALIZING
                  && $project.review_status !== ReviewStatuses.PENDING}
          <Button filled on:click={submitForReview}>
            <svg class="mr" src="static/images/icons/check-circle.svg" />
            submit for review
          </Button>
        {/if}
        {#if account
             && account.is_admin
             && $project.lifetime_stage === ProjectStages.FINALIZING
             && $project.review_status === ReviewStatuses.PENDING}
          <Button
            outline
            class="review"
            href="/projects/{$project.id}/review"
          >
            <svg class="mr" src="static/images/icons/clipboard.svg" />
            review
          </Button>
        {/if}
      </div>
    {/if}
    {#if reviewView}
      <ReviewVerdict {project} />
    {/if}
  </div>
</header>

<FinalizingDialog bind:open={finalizeDialogOpen} {account} {project} />

<DangerConfirmDialog
  textYes="yes, delete"
  bind:open={projectDeletionDialogOpen}
  on:confirm={deleteProject}
>
  Deleting a project is rarely desired. <br />
  You may edit the project or delete individual activities instead. <br />
  Think twice before proceeding.
</DangerConfirmDialog>

<style src="../../../../static/css/containers/projects/view/project-header.scss"></style>
