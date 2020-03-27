<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';
  import TextField from 'ui/text-field.svelte';

  export let activity;
  export let savedUsername = null;
  export let isOpen = false;
  export let error = null;
  let comment = '';
  let telegram = savedUsername || '';
  let remember = [{ value: 'remember', checked: false }];

  function submitApplication() {
    dispatch('submit-application', {
      activity,
      comment,
      telegram,
      remember: remember[0].checked,
    });
    comment = '';
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  {#if activity != null}
    <Dialog
      title="Apply for {activity.name}"
      closeCallback={() => isOpen = false}
      classname="apply-modal"
    >
      <form slot="content">
        {#if error != null}
          <p class="error">{error}</p>
        {/if}
        <label class="label" for="comment">Comment (optional)</label>
        <TextField
          classname="comment-field"
          multiline="true"
          bind:value={comment}
          id="comment"
        />
        <label class="label" for="telegram">Telegram username</label>
        <div class="text-field-wrapper">
          <TextField
            bind:value={telegram}
            id="telegram"
            isWithItem
            pattern="[A-Za-z0-9_]*"
            minlength={5}
            maxlength={32}
            placeholder="username"
          >
            <svg src="images/icons/at-sign.svg" class="item" />
          </TextField>
          {#if activity.telegram_required}
            <span class="helper required ">* Required</span>
          {/if}
        </div>
        <CheckboxGroup
          name="remember"
          bind:items={remember}
        />
        <div class="actions">
          <Button
            isFilled
            on:click={submitApplication}
            disabled={activity.telegram_required && !/[A-Za-z0-9_]{5,32}/.test(telegram)}
          >
            apply
          </Button>
        </div>
      </form>
    </Dialog>
  {/if}
</Modal>
