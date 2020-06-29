<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Card } from 'attractions';
  import Notice from 'src/components/common/notice.svelte';

  export let activity;

  const dispatch = createEventDispatcher();
</script>

<div class="activity moderated draft">
  <Card>
    <header class="title">{activity.name || 'Untitled'}</header>
    <Notice warning>
      <svg slot="icon" src="static/images/icons/eye-off.svg" />
      This activity is hidden from volunteers. Edit it to make it visible.
    </Notice>
    <div class="actions">
      <Button outline class="mr" on:click={() => dispatch('edit', activity)}>
        <svg class="icon mr" src="static/images/icons/edit.svg" />
        edit
      </Button>
      <Button outline danger on:click={() => dispatch('delete', activity)}>
        <svg class="icon mr" src="static/images/icons/trash-2.svg" />
        delete
      </Button>
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/view/moderator-draft-card.scss"></style>
