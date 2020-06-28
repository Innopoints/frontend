<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { Modal, Dialog, TextField, CheckboxChipGroup, FormField, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import isModeration from '@/constants/projects/moderation-activity.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let open = false;
  export let activity;
  export let application;
  export let competences;
  $: title = (
    activity
    && `Leave feedback on ${isModeration(activity) ? 'your moderation work' : activity.name}`
  );

  let value = {
    competences: [],
    answers: activity == null ? [] : new Array(activity.feedback_questions.length).fill(''),
  };

  let competenceItems = competences.map(
    ({ id, name }) => ({ label: name.toLowerCase(), value: id, checked: false }),
  );

  function processCheck({ detail: competence }) {
    if (competence.checked) {
      value.competences.push(competence.value);
      value.competences = value.competences;
    } else {
      value.competences = value.competences.filter(comp => comp !== competence.value);
    }
  }

  async function submitFeedback() {
    try {
      value.answers = value.answers.map(answer => answer || '');
      application.feedback = await api.json(api.post(
        `/projects/${activity.project}/activities/${activity.id}`
        + `/applications/${application.id}/feedback`,
        { data: value, csrfToken: $session.account.csrf_token },
      ));
      open = false;
      value = {
        competences: [],
        answers: new Array(activity.feedback_questions.length).fill(''),
      };
      competenceItems.forEach(item => item.checked = false);
      competenceItems = competenceItems;
      $session.account = await api.json(api.get('/account'));
      showSnackbar({ props: { text: 'Success! You should have received your innopoints now' } });
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Modal bind:open let:closeCallback>
  {#if application != null}
    <Dialog {title} {closeCallback}>
      <div class="content">
        <p>You are just one step away from receiving innopoints!</p>
        <p>
          Be honest – we read this feedback, and it will not
          affect the amount of innopoints you receive!
        </p>
        <div class="form">
          <FormField name="What competences have you developed (up to 3)?" required>
            <CheckboxChipGroup
              class="competence-chips"
              items={competenceItems}
              name="competences"
              max={3}
              on:change={processCheck}
            />
          </FormField>
          {#each activity.feedback_questions as question, index}
            <FormField name={question}>
              <TextField multiline maxlength={1024} bind:value={value.answers[index]} />
            </FormField>
          {/each}
        </div>
        <div class="actions">
          <Button noRipple filled disabled={!value.competences} on:click={submitFeedback}>
            submit & claim innopoints
          </Button>
        </div>
      </div>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/projects/view/leave-feedback-modal.scss"></style>
