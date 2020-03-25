<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';
  import { API_HOST } from '@/constants/env.js';
  import ProjectStages from '@/constants/backend/project-lifetime-stages.js';

  export let project;
  export let account;

  const projectImageURL = (
    project.image_id == null ?
      '/images/create-project/placeholder.svg'
    : `${API_HOST}/file/${project.image_id}`
  );

  const dispatch = createEventDispatcher();
</script>

<header class="project-header" style="--image-url: url({projectImageURL})">
  <img src={projectImageURL} class="cover-image" alt="Project cover image" />
  <div class="info">
    <h1>{project.name}</h1>
    <div class="data-points">
      <Labeled icon label="When">
        <svg slot="icon" class="icon" src="images/icons/calendar.svg" />
        {formatDateRange({ start: project.start_date, end: project.end_date })}
      </Labeled>
      <Labeled icon label="Organizer">
        <svg slot="icon" class="icon" src="images/icons/user.svg" />
        {project.organizer}
        {#if account.is_admin}
          <a href="mailto:{project.creator}" class="secondary">
            contact project creator
          </a>
        {/if}
      </Labeled>
    </div>
    {#if project.creator === account.email || account.is_admin}
      <div class="actions">
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
        {#if account.is_admin && project.lifetime_stage === ProjectStages.FINALIZING}
          <Button isOutline classname="review">
            <svg class="icon mr" src="images/icons/clipboard.svg" />
            review
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</header>
