<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Labeled from 'ui/labeled.svelte';
  import CopyButton from '@/components/projects/view/copy-button.svelte';
  import s from '@/utils/plural-s.js';

  export let activity;
  export let application;
  export let review = false;

  function readFeedback() {
    dispatch('read-feedback', {
      from: application.applicant,
      feedback: application.feedback,
      activity,
    });
  }

  const dispatch = createEventDispatcher();
</script>

<li class="panel" class:no-feedback={application.feedback == null}>
  <div class="name">
    {application.applicant.full_name}
  </div>
  <span class="telegram popover-container">
    {#if application.telegram}
      <a href="https://t.me/{application.telegram}">
        @{application.telegram}
      </a>
      <CopyButton text={application.telegram} />
    {:else}
      No Telegram username specified.
    {/if}
  </span>
  {#if !review && application.feedback != null}
    <Button isOutline classname="feedback" on:click={readFeedback}>
      read feedback
    </Button>
  {/if}
  <Labeled classname="hours" label="Actual hours">
    <div class="content">
      {application.actual_hours} hour{s(application.actual_hours)}
    </div>
  </Labeled>
  <Labeled classname="reward" label="Reward">
    <div class="content">
      {activity.reward_rate * application.actual_hours}
      <svg class="innopoint" src="images/innopoint-sharp.svg" />
    </div>
  </Labeled>
</li>
