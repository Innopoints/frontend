<script>
  import { goto, stores } from '@sapper/app';
  import { Button, DropdownShell, Dropdown, H1, H2 } from 'attractions';
  import DraftCard from 'src/components/projects/new/draft-card.svelte';
  import {
    getBlankProject,
    getOlympiad,
    getStudentParty,
  } from 'src/constants/projects/project-templates.js';
  import * as api from 'src/utils/api.js';
  import sleep from 'src/utils/sleep.js';

  const { session } = stores();

  export let drafts;
  export let project;

  let shownDraftIndex = 0;
  let animationDirection = null;
  const ANIMATE_LEFT = 'left';
  const ANIMATE_RIGHT = 'right';
  const ANIMATE_DOWN = 'down';

  async function showPrevDraft() {
    animationDirection = ANIMATE_LEFT;
    await sleep(200);
    if (shownDraftIndex > 0) {
      animationDirection = null;
      shownDraftIndex--;
    }
  }

  async function showNextDraft() {
    animationDirection = ANIMATE_RIGHT;
    await sleep(200);
    if (shownDraftIndex + 1 < drafts.length) {
      animationDirection = null;
      shownDraftIndex++;
    }
  }

  async function deleteDraft({ detail: draftID }) {
    if (drafts.length !== 1) {
      animationDirection = ANIMATE_DOWN;
    }

    try {
      await Promise.all([
        api.json(api.del(`/projects/${draftID}`, { csrfToken: $session.account.csrf_token })),
        sleep(200),
      ]);
      drafts.splice(drafts.findIndex(draft => draft.id === draftID), 1);
      drafts = drafts;
      animationDirection = null;
      if (shownDraftIndex >= drafts.length && shownDraftIndex > 0) {
        shownDraftIndex--;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function startProject(template) {
    project.set(template);
    goto('/projects/new?step=1');
  }
</script>

<div class="step-0">
  <div class="left">
    <H1>Create a Project</H1>
    <div class="subtitle">
      Unleash your creative genius — we're here to help you!
    </div>
    <div class="advice">
      <DropdownShell let:toggle>
        <Button on:click={toggle}>
          what is a project?
          <svg class="ml dropdown-chevron" src="static/images/icons/chevron-down.svg" />
        </Button>
        <Dropdown>
          A project could be an event, an olympiad or any other volunteering opportunity. <br />
          Create some activities and have volunteers apply to them.
        </Dropdown>
      </DropdownShell>
    </div>
    <img loading="lazy" class="illustration" src="/images/create-project/create-project.svg" alt="" />
  </div>

  <div class="right">
    <H2>Starting Point</H2>

    {#if drafts.length > 0}
      <section class="drafts">
        You could continue from one of your drafts:
        <div class="cards">
          {#if shownDraftIndex < drafts.length}
            <DraftCard
              direction={animationDirection}
              draft={drafts[shownDraftIndex]}
              on:draft-selected={({ detail: draft }) => startProject(draft)}
              on:delete-draft={deleteDraft}
            />
          {/if}
        </div>
        {#if drafts.length > 1}
          <nav>
            <Button
              round
              on:click={showPrevDraft}
              disabled={shownDraftIndex === 0}
            >
              <svg src="static/images/icons/chevron-left.svg" />
            </Button>
            <Button
              round
              on:click={showNextDraft}
              disabled={shownDraftIndex + 1 === drafts.length}
            >
              <svg src="static/images/icons/chevron-right.svg" />
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
        <Button outline rectangle on:click={() => startProject(getOlympiad())}>
          <svg src="static/images/icons/award.svg" class="mr" />
          Olympiad
        </Button>
        <Button outline rectangle on:click={() => startProject(getStudentParty())}>
          <svg src="static/images/icons/speaker.svg" class="mr" />
          Student Party
        </Button>
      </div>
      Or start completely from scratch:
      <div class="actions">
        <Button outline rectangle on:click={() => startProject(getBlankProject())}>
          <svg src="static/images/icons/package.svg" class="mr" />
          Blank Project
        </Button>
      </div>
    </section>
  </div>
</div>

<style src="../../../../static/css/containers/projects/new/step-0.scss"></style>
