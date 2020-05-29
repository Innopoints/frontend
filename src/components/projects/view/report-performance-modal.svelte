<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';
  import TextField from 'ui/text-field.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';
  import StarRating from 'ui/star-rating.svelte';
  import s from '@/utils/plural-s.js';

  export let activity;
  export let application;
  export let report;
  export let isOpen = false;

  $: value = report || {
    rating: null,
    content: '',
  };

  function submit() {
    value = {
      rating: value.rating,
      content: value.content,
    };
    dispatch('submit', { value, application, activity, report });
    value = {
      rating: null,
      content: '',
    };
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  {#if application != null}
    <Dialog
      title="{report == null ? 'Create a' : 'Edit the'} report on {application.applicant.full_name}"
      classname="report-performance"
      closeCallback={() => isOpen = false}
    >
      <form class="content report-form" slot="content">
        <p class="constrain-width">
          Write any notes about this volunteer for future reference.
          <span class="lb">
            These reports will be visible to you and moderators of the projects you're working on.
            The volunteer <strong>will not</strong> see this report.
          </span>
        </p>
        <div class="constrain-width refresher">
          <Labeled icon label="Volunteer">
            <svg class="icon" slot="icon" src="images/icons/user.svg" />
            <span class="content">
              {application.applicant.full_name}
              {#if application.telegram}
                <span class="telegram popover-container">
                  <a href="https://t.me/{application.telegram}" target="_blank">
                    @{application.telegram}
                  </a>
                  <CopyButton text={application.telegram} />
                </span>
              {/if}
            </span>
          </Labeled>
          <Labeled icon label="Actual worktime">
            <svg class="icon" slot="icon" src="images/icons/clock.svg" />
            {#if activity.fixed_reward}
              as needed
            {:else}
              {application.actual_hours} hour{s(application.actual_hours)}
            {/if}
          </Labeled>
        </div>
        <label for="rating">
          How would you rate the performance of the volunteer?
          <span class="required">*</span>
        </label>
        <StarRating name="rating" bind:value={value.rating} />
        <label for="text-feedback">Leave any comments about the volunteer's work</label>
        <TextField
          id="text-feedback"
          multiline
          maxlength={1024}
          bind:value={value.content}
        />
        <div class="actions">
          <Button
            isFilled
            on:click={submit}
            disabled={value.rating == null}
          >
            save
          </Button>
        </div>
      </form>
    </Dialog>
  {/if}
</Modal>
