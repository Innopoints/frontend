<script>
  import { createEventDispatcher } from 'svelte';
  import Dialog from 'ui/dialog.svelte';
  import TextField from 'ui/text-field.svelte';
  import CheckChipGroup from 'ui/check-chip-group.svelte';
  import Modal from 'ui/modal.svelte';

  export let isOpen = false;
  export let activity;
  export let application;
  export let competences;

  let value = {
    competences: [],
    answers: activity == null ? [] : new Array(activity.feedback_questions.length).fill(''),
  };

  const competenceItems = competences.map(({ id }) => ({ value: id, checked: false }));
  const competenceLabels = competences.map(({ name }) => name.toLowerCase());

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
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:isOpen>
  {#if activity != null}
    <Dialog
      classname="feedback-modal"
      title="Leave Feedback on {activity.name}"
      closeCallback={() => isOpen = false}
    >
      <div class="content" slot="content">
        <p>You are just one step away from receiving innopoints!</p>
        <p>
          Be honest – we read this feedback, and it will not
          affect the amount of innopoints you receive!
        </p>
        <form>
          <div class="form-field">
            <label for="competences">
              What competences have you developed (up to 3)?
              <span class="required">*</span>
            </label>
            <CheckChipGroup
              classname="competence-chips"
              items={competenceItems}
              name="competences"
              labels={competenceLabels}
              maxChecked={3}
              on:change={processCheck}
            />
          </div>
          {#each activity.feedback_questions as question, index}
            <div class="form-field">
              <label for="question{index}">
                {question}
              </label>
              <TextField
                multiline
                id="question{index}"
                maxlength={1024}
                bind:value={value.answers[index]}
              />
            </div>
          {/each}
        </form>
        <div class="actions">
          <button
            class="btn filled"
            type="button"
            disabled={value.competences.length === 0}
            on:click={submit}
          >
            submit & claim innopoints
          </button>
        </div>
      </div>
    </Dialog>
  {/if}
</Modal>
