<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import {
    AccordionSection,
    Badge,
    Button,
    Checkbox,
    Label,
    Popover,
    TextField,
  } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';
  import { snackbarContextKey } from 'attractions/snackbar';
  import CopyButton from 'src/components/common/copy-button.svelte';
  import CreateReportDialog from 'src/components/projects/view/create-report-dialog.svelte';
  import * as api from 'src/utils/api.js';

  export let account;
  export let activity;
  export let application;
  export let hourChanges;
  $: report = application.reports.find(report => report.reporter_email === account.email);

  const createReportDialog = {
    open: false,
    show() {
      createReportDialog.open = true;
    },
  };

  async function deleteReport() {
    try {
      const thisReport = report;
      application.reports = application.reports.filter(
        report => thisReport.reporter_email !== account.email,
      );
      const snackbar = showSnackbar({
        props: {
          text: 'Report deleted',
          action: { text: 'undo' },
        },
      });
      if (await snackbar.expired) {
        await api.json(api.del(
          `/projects/${activity.project}/activities/${activity.id}`
          + `/applications/${application.id}/report`,
          { csrfToken: account.csrf_token },
        ));
      } else {
        application.reports.push(thisReport);
        application.reports = application.reports;
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
        <Badge hidden={report != null}>
          <svg class="accordion-chevron" src="static/images/icons/chevron-down.svg" />
        </Badge>
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
      <div class="actual-hours">
        {#if !activity.fixed_reward}
          <Label class="above">Actual hours</Label>
          <TextField
            type="number"
            placeholder="1"
            min={0}
            max={99999}
            value={hourChanges.get(application) || application.actual_hours}
            on:change={({ detail }) => {
              if (detail.value >= 0) {
                dispatch('hours-changed', { application, hours: detail.value });
              }
            }}
          />
        {:else}
          <Checkbox
            name="did-work"
            checked={application.actual_hours === 1}
            slotLeft
            value={1}
            on:change={(e) => dispatch('hours-changed', { application, hours: +e.detail.checked })}
          >
            <Label class="mr">Completed the task</Label>
          </Checkbox>
        {/if}
      </div>
    </div>
    {#if application.comment}
      <div class="with-icon">
        <svg class="icon" src="static/images/icons/message-square.svg" />
        <div class="text">
          {application.comment}
        </div>
      </div>
    {/if}
    <div class="actions">
      {#if report == null}
        <Button outline on:click={createReportDialog.show}>
          <svg class="icon mr" src="static/images/icons/edit-3.svg" />
          report performance
        </Button>
      {:else}
        <Button outline class="mr" on:click={createReportDialog.show}>
          <svg class="icon mr" src="static/images/icons/edit-3.svg" />
          edit report
        </Button>
        <Button outline danger on:click={deleteReport}>
          <svg class="icon mr" src="static/images/icons/edit-3.svg" />
          delete report
        </Button>
      {/if}
    </div>
  </AccordionSection>
  <CreateReportDialog
    bind:open={createReportDialog.open}
    {activity}
    {application}
    {report}
    on:rerender={() => application.reports = application.reports}
  />
</div>

<style src="../../../../static/css/components/projects/view/application-hour-tile.scss"></style>
