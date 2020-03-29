<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';

  export let draft;

  const dispatch = createEventDispatcher();
</script>

<div class="card">
  <div class="title">{draft.name || 'Untitled'}</div>
  {#if draft.creation_time != null}
    <div class="subtitle">
      draft from {(new Date(draft.creation_time)).toLocaleDateString('ru')}
    </div>
  {/if}
  <div class="actions">
    <Button isDanger on:click={() => dispatch('delete-draft', draft.id)}>
      <svg src="/images/icons/trash-2.svg" class="icon mr"/>
      delete
    </Button>
    <Button on:click={() => dispatch('load-draft', draft.id)}>
      <svg src="/images/icons/corner-down-right.svg" class="icon mr"/>
      continue
    </Button>
  </div>
</div>
