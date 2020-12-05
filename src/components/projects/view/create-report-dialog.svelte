<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { Button, Dialog, Modal, TextField, StarRating, Popover } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';
  import { snackbarContextKey } from 'attractions/snackbar';
  import { s } from 'attractions/utils';
  import Labeled from 'src/components/common/labeled.svelte';
  import CopyButton from 'src/components/common/copy-button.svelte';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let activity;
  export let application;
  export let report = null;
  export let open = false;

  $: value = report || {
    rating: null,
    content: '',
  };

  async function submitReport() {
    try {
      const apiCall = report == null ? api.post : api.patch;
      const updatedReport = await api.json(apiCall(
        `/projects/${activity.project}/activities/${activity.id}`
        + `/applications/${application.id}/report`,
        {
          data: { rating: value.rating, content: value.content },
          csrfToken: $session.account.csrf_token,
        },
      ));
      application.reports = application.reports.filter(report => report.id !== updatedReport.id);
      application.reports.push(updatedReport);
      open = false;
      showSnackbar({ props: { text: 'Successfully saved the report' } });
      dispatch('rerender');
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<Modal bind:open let:closeCallback>
  {#if application != null}
    <Dialog
      title="{report == null ? 'Create a' : 'Edit the'} report on {application.applicant.full_name}"
      {closeCallback}
      constrainWidth
    >
      <form class="report-form">
        <p>
          Write any notes about this volunteer for future reference.
          <span class="lb">
            These reports will be visible to you and moderators of the projects you're working on.
            The volunteer <strong>will not</strong> see this report.
          </span>
        </p>
        <div class="refresher">
          <Labeled icon label="Volunteer">
            <svg class="icon mr" slot="icon" src="static/images/icons/user.svg" />
            <span class="content">
              {application.applicant.full_name}
              {#if application.telegram}
                <Popover position={PopoverPositions.TOP} class="telegram">
                  <a href="https://t.me/{application.telegram}" target="_blank">
                    @{application.telegram}
                  </a>
                  <div slot="popover-content">
                    <CopyButton text={application.telegram} />
                  </div>
                </Popover>
              {/if}
            </span>
          </Labeled>
          <Labeled icon label="Actual worktime">
            <svg class="icon mr" slot="icon" src="static/images/icons/clock.svg" />
            <span class="content">
              {#if activity.fixed_reward}
                as needed
              {:else}
                {application.actual_hours} hour{s(application.actual_hours)}
              {/if}
            </span>
          </Labeled>
        </div>
        <label for="rating">
          How would you rate the performance of the volunteer?
          <span class="required">*</span>
        </label>
        <StarRating name="rating-{application.id}" bind:value={value.rating} />
        <label for="text-feedback-{application.id}">
          Leave any comments about the volunteer's work
        </label>
        <TextField
          id="text-feedback-{application.id}"
          multiline
          maxlength={1024}
          bind:value={value.content}
        />
        <div class="actions">
          <Button filled on:click={submitReport} disabled={value.rating == null}>
            save
          </Button>
        </div>
      </form>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/projects/view/create-report-dialog.scss"></style>
