<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Card } from 'attractions';
  import Labeled from 'ui/labeled.svelte';
  import HOURLY_RATE from '@/constants/backend/default-hourly-rate.js';

  export let activity;

  const dispatch = createEventDispatcher();
</script>

<div class="activity">
  <Card>
    <div class="title">
      {activity.name || 'Untitled'}
      {#if activity.draft}
        <div class="hidden" title="This activity is marked as a draft and is not visible.">
          <svg class="mr" src="images/icons/eye-off.svg" />
          hidden
        </div>
      {/if}
    </div>
    <div class="parameters">
      <Labeled label="Reward">
        <div class="content">
          {activity.fixed_reward ? activity.reward_rate : HOURLY_RATE * activity.working_hours}
          <svg src="images/innopoint-sharp.svg" class="innopoint" />
        </div>
      </Labeled>
      <Labeled label="People required">
        <div class="content">
          {#if activity.people_required == null}
            the more, the better
          {:else if activity.people_required === 1}
            1 person
          {:else}
            {activity.people_required} people
          {/if}
        </div>
      </Labeled>
    </div>

    <div class="actions">
      <Button on:click={() => dispatch('copy', activity)}>
        <svg src="images/icons/copy.svg" class="mr" />
        <span class="text">copy</span>
      </Button>
      <Button on:click={() => dispatch('edit', activity)}>
        <svg src="images/icons/edit.svg" class="mr" />
        <span class="text">edit</span>
      </Button>
      <Button danger on:click={() => dispatch('delete', activity)}>
        <svg src="images/icons/trash-2.svg" class="mr" />
        <span class="text">delete</span>
      </Button>
    </div>
  </Card>
</div>

<style src="../../../../static/css/components/projects/new/activity-card.scss"></style>
