<script>
  import Dialog from 'ui/dialog.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';
  import Modal from 'ui/modal.svelte';

  export let isOpen = false;
  export let activity;
  export let from;
  export let feedback;
  export let competences;

  function getCompetenceByID(id) {
    return competences.find(comp => comp.id === id).name.toLowerCase();
  }
</script>

<Modal bind:isOpen>
  {#if activity != null}
    <Dialog
      classname="read-feedback"
      title="Feedback{from != null ? ' from ' + from.full_name : ''}"
      closeCallback={() => isOpen = false}
    >
      <article class="content" slot="content">
        <p>Developed competences:</p>
        <div class="competences">
          {#each feedback.competences as competenceID}
            <UnclickableChip small value={getCompetenceByID(competenceID)} />
          {/each}
        </div>
        {#each activity.feedback_questions as question, index}
          <p class="question">{question}</p>
          <blockquote class="answer constrain-width">
            {#if feedback.answers[index] !== ''}
              {feedback.answers[index]}
            {:else}
              <em class="no-answer">No answer.</em>
            {/if}
          </blockquote>
        {/each}
      </article>
    </Dialog>
  {/if}
</Modal>
