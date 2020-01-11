<script>
  import { slide } from 'svelte/transition';
  import Button from 'ui/button.svelte';
  import fecha from 'fecha';
  import {deleteDraft, chooseProject} from '@/store/new-project';

  export let title = '';
  export let date = '';

  const choose = e => {
    e.preventDefault();
    chooseProject(date);
  };
</script>

<div class="card" in:slide="{{duration: 300}}">
  <div class="title">{title || 'Untitled'}</div>
  {#if new Date(date) instanceof Date && !isNaN(new Date(date))}
    <div class="subtitle">draft from {fecha.format(new Date(date), 'DD.MM.YYYY')}</div>
  {/if}
  <div class="actions">
    <Button isDanger on:click={() => deleteDraft(date)}>
      <svg src="/images/icons/trash-2.svg" class="mr"/>
      delete
    </Button>
    <Button on:click={choose} href="/projects/new?step=1">
      <svg src="/images/icons/corner-down-right.svg" class="mr"/>
      continue
    </Button>
  </div>
</div>
