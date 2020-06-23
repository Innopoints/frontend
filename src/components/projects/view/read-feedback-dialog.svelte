<script>
  import { Dialog, Chip, Modal } from 'attractions';

  export let open = false;
  export let activity;
  export let from;
  export let feedback;
  export let competences;

  function getCompetenceByID(id) {
    return competences.find(comp => comp.id === id).name.toLowerCase();
  }
</script>

<Modal bind:open let:closeCallback>
  {#if feedback != null}
    <Dialog
      class="read-feedback"
      title="Feedback{from != null ? ' from ' + from.full_name : ''}"
      {closeCallback}
      constrainWidth
    >
      <article class="content">
        <p>Developed competences:</p>
        <div class="competences">
          {#each feedback.competences as competenceID}
            <Chip small outline>{getCompetenceByID(competenceID)}</Chip>
          {/each}
        </div>
        {#each activity.feedback_questions as question, index}
          <p class="question">{question}</p>
          <blockquote class="answer">
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

<style src="../../../../static/css/components/projects/view/read-feedback-dialog.scss"></style>
