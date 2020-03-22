<script>
  import Dialog from 'ui/dialog.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Modal from 'ui/modal.svelte';
  import range from '@/utils/range.js';
  import { formatDate } from '@/utils/date-time-format.js';

  export let reports = null;
  export let applicant = null;
  export let project;
  export let activity = null;
  export let isOpen = false;
</script>

<Modal bind:isOpen>
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
                <p>{activity.name} on <a href="/projects/{project.id}">{project.name}</a></p>
              </Labeled>
            </div>
            <div class="feedback">
              <p>{report.content}</p>
              <div class="stars">
                {#each [...range(report.rating)] as _}
                  <svg class="star" src="images/icons/star.svg" />
                {/each}
                {#each [...range(5 - report.rating)] as _}
                  <svg class="star off" src="images/icons/star.svg" />
                {/each}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </Dialog>
  {/if}
</Modal>
