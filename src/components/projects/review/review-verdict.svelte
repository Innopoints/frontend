<script>
  import { getContext } from 'svelte';
  import { goto, stores } from '@sapper/app';
  import { Button, TextField } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';
  import ReviewStatuses from '@/constants/backend/project-review-statuses.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let project;

  let reviewComment = null;

  async function submitReview(accepted) {
    try {
      await api.json(api.patch(`/projects/${$project.id}/review_status`, {
        data: {
          admin_feedback: reviewComment,
          review_status: accepted ? ReviewStatuses.APPROVED : ReviewStatuses.REJECTED,
        },
        csrfToken: $session.account.csrf_token,
      }));
      goto(`/projects/${$project.id}`);
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<div class="review-verdict">
  {#if $project.lifetime_stage != ProjectStages.FINALIZING
       || $project.review_status != ReviewStatuses.PENDING}
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
      <Button danger on:click={() => submitReview(false)}>
        reject
      </Button>
      <Button on:click={() => submitReview(true)}>
        accept
      </Button>
    </div>
  {/if}
</div>

<style src="../../../../static/css/components/projects/review/review-verdict.scss"></style>
