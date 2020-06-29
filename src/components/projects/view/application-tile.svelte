<script>
  import { onMount, createEventDispatcher, getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { AccordionSection, Button, Popover } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';
  import { snackbarContextKey } from 'attractions/snackbar';
  import CopyButton from 'src/components/common/copy-button.svelte';
  import Stars from 'src/components/common/stars.svelte';
  import ViewReportsDialog from 'src/components/projects/view/view-reports-dialog.svelte';
  import ApplicationStatuses from 'src/constants/backend/application-statuses.js';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let activity;
  export let application;

  let report = null;
  onMount(() => {
    report = api.json(api.get(
      `/projects/${activity.project}/activities/${activity.id}`
      + `/applications/${application.id}/report_info`,
    ));
  });

  const viewReportsDialog = {
    open: false,
    reports: null,
    async show({ detail }) {
      viewReportsDialog.reports = (await report).reports;
      viewReportsDialog.open = true;
    },
  };

  const snackbarMessages = {
    [ApplicationStatuses.APPROVED]: 'Application accepted',
    [ApplicationStatuses.REJECTED]: 'Application rejected',
    [ApplicationStatuses.PENDING]: 'Application moved to pending',
  };

  async function changeApplicationStatus(status, undoing) {
    const lastStatus = application.status;
    try {
      await api.json(api.patch(
        `/projects/${activity.project}/activities/${activity.id}/applications/${application.id}`,
        { data: { status }, csrfToken: $session.account.csrf_token },
      ));

      application.status = status;
      if (status === ApplicationStatuses.APPROVED) {
        activity.vacant_spots--;
      } else if (lastStatus === ApplicationStatuses.APPROVED) {
        activity.vacant_spots++;
      }
      dispatch('rerender');

      if (!undoing) {
        showSnackbar({
          props: {
            text: snackbarMessages[status],
            action: {
              text: 'undo',
              callback() {
                changeApplicationStatus(lastStatus, true);
              },
            },
          },
        });
      }
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<div class="application-tile">
  <AccordionSection on:panel-open>
    <div class="handle" slot="handle" let:toggle>
      <Button round on:click={toggle}>
        <svg class="accordion-chevron" src="images/icons/chevron-down.svg" />
      </Button>
      <div class="name">
        {application.applicant.full_name}
      </div>
      {#if application.telegram}
        <Popover position={PopoverPositions.TOP} class="telegram">
          <a href="https://t.me/{application.telegram}" target="_blank">
            @{application.telegram}
          </a>
          <div slot="popover-content">
            <CopyButton text={application.telegram} />
          </div>
        </Popover>
      {:else}
        No Telegram username specified.
      {/if}
    </div>
    {#if report != null}
      {#await report then reportData}
        <Stars value={reportData.average_rating} />
        <Button on:click={viewReportsDialog.show}>performance reports</Button>
      {/await}
    {/if}
    {#if application.comment}
      <div class="with-icon">
        <svg class="icon" src="images/icons/message-square.svg" />
        <div class="text">
          {application.comment}
        </div>
      </div>
    {/if}
    <div class="actions">
      {#if application.status === ApplicationStatuses.PENDING}
        <Button
          filled
          class="mr-2"
          on:click={() => changeApplicationStatus(ApplicationStatuses.APPROVED, false)}
        >
          accept
        </Button>
        <Button
          filled
          danger
          on:click={() => changeApplicationStatus(ApplicationStatuses.REJECTED, false)}
        >
          reject
        </Button>
      {:else}
        <Button
          danger
          on:click={() => changeApplicationStatus(ApplicationStatuses.PENDING, false)}
        >
          back to pending
        </Button>
      {/if}
    </div>
  </AccordionSection>
  <ViewReportsDialog
    bind:open={viewReportsDialog.open}
    applicant={application.applicant}
    reports={viewReportsDialog.reports}
  />
</div>

<style src="../../../../static/css/components/projects/view/application-tile.scss"></style>
