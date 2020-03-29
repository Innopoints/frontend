<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import HOURLY_RATE from '@/constants/backend/default-hourly-rate.js';

  export let activity;

  const dispatch = createEventDispatcher();
</script>

<div class="card activity">
  <div class="title">{activity.name}</div>
  <div class="parameters">
    <div class="labeled text">
      <div class="label">Reward</div>
      <div class="content">
        {activity.fixed_reward ? activity.reward_rate : HOURLY_RATE * activity.working_hours}
        <svg src="images/innopoint-sharp.svg" class="innopoint" />
      </div>
    </div>
    <Labeled label="People required">
      {#if activity.people_required === 0}
        the more, the better
      {:else if activity.people_required === 1}
        1 person
      {:else}
        {activity.people_required} people
      {/if}
    </Labeled>
  </div>

  <div class="actions">
    <Button tooltip="Duplicate" on:click={() => dispatch('copy-activity', activity)}>
      <svg src="images/icons/copy.svg" class="icon mr" />
      <span class="text">copy</span>
    </Button>
    <Button tooltip="Edit" on:click={() => dispatch('edit-activity', activity)}>
      <svg src="images/icons/edit.svg" class="icon mr" />
      <span class="text">edit</span>
    </Button>
    <Button isDanger tooltip="Delete" on:click={() => dispatch('delete-activity', activity)}>
      <svg src="images/icons/trash-2.svg" class="icon mr" />
      <span class="text">delete</span>
    </Button>
  </div>
</div>
