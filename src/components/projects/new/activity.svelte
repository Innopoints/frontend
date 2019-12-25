<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import {deleteActivity, duplicateActivity, editActivity} from '@/store/new-project';
  export let activity;
</script>

<Card classname="card activity">
  <svg src="/images/icons/drag-handle.svg" class="drag-handle" />
  <div class="title">{activity.name}</div>
  <div class="parameters">
    <div class="labeled text">
      <div class="label">Reward</div>
      <div class="content">
        {activity.reward}
        <svg src="/images/innopoint-sharp.svg" class="innopoint" />
        {activity.isHourly ? '/h' : ''}
      </div>
    </div>
    <Labeled label="People required">
      {activity.morePeople ? 'the more, the better' : activity.people + (activity.people === 1 ? ' person' : ' people')}
    </Labeled>
  </div>

  <div class="actions">
    <!-- TODO: add 'title' tooltip on hover -->
    <Button title="Duplicate" on:click={() => duplicateActivity(activity.order)}>
      <svg src="/images/icons/copy.svg" class="icon mr" />
      <span class="text">copy</span>
    </Button>
    <Button title="Edit" on:click={() => editActivity(activity.order)}>
      <svg src="/images/icons/edit.svg" class="icon mr" />
      <span class="text">edit</span>
    </Button>
    <Button isDanger on:click={() => deleteActivity(activity.order)}>
      <svg src="/images/icons/trash-2.svg" class="icon mr" />
      <span class="text">delete</span>
    </Button>
  </div>
</Card>
