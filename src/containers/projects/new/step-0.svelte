<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import DraftCard from '@/components/projects/new/draft-card.svelte';
  import {
    getBlankProject,
    getOlympiad,
    getStudentParty,
  } from '@/constants/projects/project-templates.js';

  export let drafts;
  let shownDraftIndex = 0;
  $: {
    shownDraftIndex = Math.min(shownDraftIndex, drafts.length - 1);
  }

  const dispatch = createEventDispatcher();

  function showPrevDraft() {
    if (shownDraftIndex > 0) {
      shownDraftIndex--;
    }
  }

  function showNextDraft() {
    if (shownDraftIndex + 1 < drafts.length) {
      shownDraftIndex++;
    }
  }
</script>

<div class="left">
  <h1>Create a Project</h1>
  <div class="subtitle">
    Unleash your creative genius — we're here to help you!
  </div>
  <img class="illustration" src="/images/create-project/create-project.svg" alt="" />
</div>

<div class="right">
  <h2>Starting Point</h2>

  {#if drafts.length > 0}
    <section class="drafts">
      You could continue from one of your drafts:
      <div class="cards">
        {#if drafts.length > 1}
          <Button
            isRound
            classname="tablet"
            on:click={showPrevDraft}
            disabled={shownDraftIndex === 0}
          >
            <svg class="icon" src="/images/icons/chevron-left.svg" />
          </Button>
        {/if}
        <DraftCard draft={drafts[shownDraftIndex]} on:delete-draft on:load-draft />
        {#if drafts.length > 1}
          <Button
            isRound
            classname="tablet"
            on:click={showNextDraft}
            disabled={shownDraftIndex + 1 === drafts.length}
          >
            <svg class="icon" src="/images/icons/chevron-right.svg" />
          </Button>
        {/if}
      </div>
      {#if drafts.length > 1}
        <nav class="mobile">
          <Button
            isRound
            on:click={showPrevDraft}
            disabled={shownDraftIndex === 0}
          >
            <svg class="icon" src="/images/icons/chevron-left.svg" />
          </Button>
          <Button
            isRound
            on:click={showNextDraft}
            disabled={shownDraftIndex + 1 === drafts.length}
          >
            <svg class="icon" src="/images/icons/chevron-right.svg" />
          </Button>
        </nav>
      {/if}
    </section>
  {:else}
    <section class="no-drafts">
      Your drafts will appear here.
      <div class="clarification">
        The projects are auto-saved so you may always continue your work.
      </div>
    </section>
  {/if}

  <section class="templates">
    Jumpstart your project with a template:
    <div class="actions">
      <Button on:click={() => dispatch('project-start', getOlympiad())} isOutline isRectangle>
        <svg src="/images/icons/award.svg" class="icon mr" />
        Olympiad
      </Button>
      <Button on:click={() => dispatch('project-start', getStudentParty())} isOutline isRectangle>
        <svg src="/images/icons/speaker.svg" class="icon mr" />
        Student Party
      </Button>
    </div>
    Or start completely from scratch:
    <div class="actions">
      <Button on:click={() => dispatch('project-start', getBlankProject())} isOutline isRectangle>
        <svg src="/images/icons/package.svg" class="icon mr" />
        Blank Project
      </Button>
    </div>
  </section>
</div>
