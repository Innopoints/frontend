<script>
  import { Dialog, Modal } from 'attractions';
  import Labeled from 'ui/labeled.svelte';
  import Stars from '@/components/common/stars.svelte';
  import EmptyState from '@/components/common/empty-state.svelte';
  import { formatDate } from '@/utils/date-time-format.js';

  export let reports = null;
  export let applicant = null;
  export let open = false;
</script>

<Modal bind:open let:closeCallback>
  {#if reports != null}
    <Dialog title="Reports on {applicant.full_name}" {closeCallback}>
      <ul class="content reports">
        {#each reports as report}
          <li class="report">
            <div class="data-points">
              <Labeled icon label="Report date">
                <svg slot="icon" class="icon mr" src="images/icons/calendar.svg" />
                {formatDate(report.time)}
              </Labeled>
              <Labeled icon label="Volunteering activity">
                <svg slot="icon" class="icon mr" src="images/icons/zap.svg" />
                <p>
                  {report.application_on.activity.name} on
                  <a href="/projects/{report.application_on.activity.project.id}">
                    {report.application_on.activity.project.name}
                  </a>
                </p>
              </Labeled>
            </div>
            <div class="feedback">
              {#if report.content}
                <p>{report.content}</p>
              {:else}
                <em>No feedback.</em>
              {/if}
              <Stars value={report.rating} />
            </div>
          </li>
        {:else}
          <EmptyState
            small
            text="No reports yet"
            subtext="Be sure to leave one when finalizing the project!"
          >
            <img src="images/view-project/no-applications.svg" alt="" />
          </EmptyState>
        {/each}
      </ul>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/projects/view/view-reports-dialog.scss"></style>
