<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import fecha from 'fecha';
  import {deleteDraft} from '@/store/new-project';

  export let title = '';
  export let date = '';
</script>

<Card>
  <div class="title">{title || 'Untitled'}</div>
  <div class="subtitle">draft from {fecha.format(new Date(date), 'DD.MM.YYYY')}</div>
  <div class="actions">
    <Button isDanger on:click={() => deleteDraft(date)}>
      <svg src="/images/icons/trash-2.svg" class="mr"/>
      delete
    </Button>
    <Button href="/projects/new?step=1">
      <svg src="/images/icons/corner-down-right.svg" class="mr"/>
      continue
    </Button>
  </div>
</Card>
