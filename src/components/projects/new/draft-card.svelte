<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Button, Card } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import classes from 'src/utils/classes.js';
  import * as api from 'src/utils/api.js';
  import { prepareAfterBackend } from 'src/utils/project-manipulation.js';

  export let draft;
  export let direction;

  async function loadDraft() {
    try {
      const draftProject = await api.json(api.get(`/projects/${draft.id}`));
      draftProject.activities.forEach(prepareAfterBackend);
      dispatch('draft-selected', draftProject);
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
  const dispatch = createEventDispatcher();
</script>

<div class={classes('draft-card animate', direction)}>
  <Card>
    <div class="title">{draft.name || 'Untitled'}</div>
    <div class="subtitle">
      draft from {(new Date(draft.creation_time)).toLocaleDateString('ru')}
    </div>
    <div class="actions">
      <Button danger on:click={() => dispatch('delete-draft', draft.id)}>
        <svg src="static/images/icons/trash-2.svg" class="mr" />
        delete
      </Button>
      <Button class="ml" on:click={loadDraft}>
        <svg src="static/images/icons/corner-down-right.svg" class="mr" />
        continue
      </Button>
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/new/draft-card.scss"></style>
