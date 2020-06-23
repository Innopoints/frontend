<script>
  import { createEventDispatcher } from 'svelte';
  import { Modal, Dialog, TextField, CheckboxChipGroup, FormField, Button } from 'attractions';
  import isModeration from '@/constants/projects/moderation-activity.js';

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

  function submit() {
    dispatch('submit', { activity, application, value });
    value = {
      competences: [],
      answers: new Array(activity.feedback_questions.length).fill(''),
    };
    competenceItems.forEach(item => item.checked = false);
    competenceItems = competenceItems;
    open = false;
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open let:closeCallback>
  {#if activity != null}
    <Dialog {title} {closeCallback}>
      <div class="content">
        <p>You are just one step away from receiving innopoints!</p>
        <p>
          Be honest – we read this feedback, and it will not
          affect the amount of innopoints you receive!
        </p>
        <form>
          <FormField
            name="What competences have you developed (up to 3)?"
            required
          >
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
              <TextField
                multiline
                maxlength={1024}
                bind:value={value.answers[index]}
              />
            </FormField>
          {/each}
        </form>
        <div class="actions">
          <Button
            noRipple
            filled
            disabled={!value.competences}
            on:click={submit}
          >
            submit & claim innopoints
          </Button>
        </div>
      </div>
    </Dialog>
  {/if}
</Modal>

<style src="../../../../static/css/components/projects/view/leave-feedback-modal.scss"></style>
