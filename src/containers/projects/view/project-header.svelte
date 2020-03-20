<script>
  import Labeled from 'ui/labeled.svelte';
  import { formatDateRange } from '@/utils/date-time-format.js';
  
  export let project;

  const projectImageURL = (
    project.image_id == null ?
      '/images/create-project/placeholder.svg'
    : `/file/{project.image_id}`
  );
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
        <!--
        TODO: show for admins
        <a href="admin-dashboard.html?users=creator@email.com" class="secondary" style="display: none;">
          contact project creator
        </a>
        -->
      </Labeled>
    </div>
    <!--
    TODO: show for creators
    <div class="actions" style="display: none;">
      <a href="create-project-step1.html" class="btn outline">
        <svg class="icon mr" src="images/icons/edit.svg" />
        edit
      </a>
      <button class="btn outline danger" type="button">
        <svg class="icon mr" src="images/icons/trash-2.svg" />
        delete
      </button>
      <button class="btn outline finalize" type="button">
        <svg class="icon mr" src="images/icons/check-circle.svg" />
        finalize
      </button>
      <a href="review-project.html" class="btn outline review" style="display: none;">
        <svg class="icon mr" src="images/icons/clipboard.svg" />
        review
      </a>
    </div>
    -->
  </div>
</header>
