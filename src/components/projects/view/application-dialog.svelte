<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { Button, Dialog, Modal, TextField, FormField } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let activity;
  export let open = false;
  let comment = '';
  let telegram = $session.account.telegram_username || '';

  async function submitApplication() {
    try {
      const application = await api.json(api.post(
        `/projects/${activity.project}/activities/${activity.id}/applications`,
        { data: { telegram, comment }, csrfToken: $session.account.csrf_token },
      ));
      application.applicant = $session.account;
      activity.existing_application = application;

      if (telegram && telegram != $session.account.telegram) {
        try {
          await api.json(api.patch(
            '/account/telegram',
            { data: { telegram_username: telegram }, csrfToken: $session.account.csrf_token },
          ));
          $session.account.telegram = telegram;
          $session.account = $session.account;
        } catch (e) {
          console.error(e);
        }
      }
      open = false;
      comment = '';
      showSnackbar({ props: { text: 'Application placed successfully' } });
    } catch (e) {
      showSnackbar({ props: { text: 'Couldn\'t apply, try reloading the page' } });
      console.error(e);
    }
  }

  const telegramUsernameRegex = /[A-Za-z0-9_]{5,32}/;
  $: usernameValid = telegramUsernameRegex.test(telegram);
  const showSnackbar = getContext(snackbarContextKey);
</script>

<Modal bind:open let:closeCallback>
  {#if activity != null}
    <Dialog title="Apply for {activity.name}" {closeCallback}>
      <div class="form">
        <FormField name="Comment" optional>
          <TextField
            class="comment-field"
            multiline="true"
            maxlength={1024}
            bind:value={comment}
          />
        </FormField>
        <FormField name="Telegram username" required={activity.telegram_required}>
          <TextField
            bind:value={telegram}
            withItem
            pattern="[A-Za-z0-9_]*"
            minlength={5}
            maxlength={32}
            placeholder="username"
          >
            <svg src="images/icons/at-sign.svg" class="item" />
          </TextField>
        </FormField>
        <div class="actions">
          <Button
            filled
            on:click={submitApplication}
            disabled={!usernameValid && (telegram !== '' || activity.telegram_required)}
          >
            apply
          </Button>
        </div>
      </div>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/projects/view/application-dialog.scss"></style>
