<script>
  import { getContext } from 'svelte';
  import { Button, Popover, AccordionSection } from 'attractions';
  import { PopoverPositions } from 'attractions/popover';
  import Labeled from '@/components/common/labeled.svelte';
  import CopyButton from '@/components/common/copy-button.svelte';
  import ReadFeedbackDialog from '@/components/projects/view/read-feedback-dialog.svelte';
  import s from '@/utils/plural-s.js';

  export let activity;
  export let application;
  export let competences;
  export let review = getContext('review-mode');

  const readFeedbackDialog = {
    open: false,
    show() {
      readFeedbackDialog.open = true;
    },
  };
</script>

<div class="feedback-tile">
  <AccordionSection on:panel-open>
    <div class="handle" slot="handle">
      <div class="name">
        {application.applicant.full_name}
      </div>
      {#if application.telegram}
        <Popover position={PopoverPositions.TOP} class="telegram">
          <a href="https://t.me/{application.telegram}" target="_blank">
            @{application.telegram}
          </a>
          <div slot="popover-content">
            <CopyButton text={application.telegram} />
          </div>
        </Popover>
      {:else}
        No Telegram username specified.
      {/if}
      {#if !review && application.feedback != null}
        <Button outline class="feedback" on:click={readFeedbackDialog.show}>
          read feedback
        </Button>
      {/if}
      <Labeled class="hours" label="Actual hours">
        <div class="content">
          {application.actual_hours} hour{s(application.actual_hours)}
        </div>
      </Labeled>
      <Labeled class="reward" label="Reward">
        <div class="content">
          {activity.reward_rate * application.actual_hours}
          <svg class="innopoint" src="images/innopoint-sharp.svg" />
        </div>
      </Labeled>
      <ReadFeedbackDialog
        bind:open={readFeedbackDialog.open}
        {activity}
        feedback={application.feedback}
        from={application.applicant}
        {competences}
      />
    </div>
  </AccordionSection>
</div>

<style src="../../../../static/css/components/projects/view/feedback-tile.scss"></style>
