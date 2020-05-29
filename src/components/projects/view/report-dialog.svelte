<script>
  import Dialog from 'ui/dialog.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Modal from 'ui/modal.svelte';
  import { formatDate } from '@/utils/date-time-format.js';

  export let reports = null;
  export let applicant = null;
  export let isOpen = false;
</script>

<Modal bind:isOpen classname="view-reports">
  {#if reports != null}
    <Dialog title="Reports on {applicant.full_name}" closeCallback={() => isOpen = false}>
      <ul slot="content" class="content reports">
        {#each reports as report}
          <li class="report">
            <div class="data-points">
              <Labeled icon label="Report date">
                <svg slot="icon" class="icon" src="images/icons/calendar.svg" />
                {formatDate(report.time)}
              </Labeled>
              <Labeled icon label="Volunteering activity">
                <svg slot="icon" class="icon" src="images/icons/zap.svg" />
                <p>
                  {report.application_on.activity.name} on
                  <a href="/projects/{report.application_on.activity.project.id}">
                    {report.application_on.activity.project.name}
                  </a>
                </p>
              </Labeled>
            </div>
            <div class="feedback">
              <p>{report.content}</p>
              <div class="stars">
                {#each [0, 1, 2, 3, 4] as i}
                  {#if i < report.rating}
                    <svg class="star" src="images/icons/star.svg" />
                  {:else}
                    <svg class="star off" src="images/icons/star.svg" />
                  {/if}
                {/each}
              </div>
            </div>
          </li>
        {:else}
          <div class="empty">
            <div class="icon">
              <img src="images/view-project/no-applications.svg" alt="" />
            </div>
            <div class="title">No reports yet</div>
            <div class="subtitle">Be sure to leave one when finalizing the project!</div>
          </div>
        {/each}
      </ul>
    </Dialog>
  {/if}
</Modal>
