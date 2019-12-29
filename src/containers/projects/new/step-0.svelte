<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  import Button from 'ui/button.svelte';
  import DraftCard from '@/components/projects/new/draft-card.svelte';
  import {drafts, getDrafts, createProject} from '@/store/new-project';
  onMount(getDrafts);

  const create = e => {
    e.preventDefault();
    createProject();
  };

  $: rangeLen = $drafts.length;
  let range = {start: 0, end: 1};
  const next = () => {
    if (range.start + 1 >= rangeLen) range.start = 0;
    else range.start++;

    if (range.end + 1 >= rangeLen) range.end = 0;
    else range.end++;
  };
  const prev = () => {
    if (range.start - 1 < 0) range.start = rangeLen - 1;
    else range.start--;

    if (range.end - 1 < 0) range.end = rangeLen - 1;
    else range.end--;
  };
</script>

<div class="left" transition:fade={{duration:200}}>
  <h1>Create a Project</h1>
  <div class="subtitle">
    Unleash your creative genius — we're here to help you!
  </div>
  <img class="illustration" src="/images/create-project/create-project.svg" alt="">
</div>

<div class="right" transition:fade={{duration:200}}>
  <h2>Starting Point</h2>

  {#if $drafts.length > 0}
    <section class="drafts">
      You could continue from one of your drafts:
      <div class="cards">
        {#if $drafts.length > 2}
          <Button classname="btn round tablet" on:click={prev}>
            <svg src="/images/icons/chevron-left.svg" />
          </Button>
        {/if}
        {#each $drafts as draft, i}
          {#if i === range.start || i === range.end}
            <DraftCard title={draft.name} date={draft.creationTime} />
          {/if}
        {/each}
        {#if $drafts.length > 2}
          <Button classname="btn round tablet" on:click={next}>
            <svg src="/images/icons/chevron-right.svg" />
          </Button>
        {/if}
      </div>
      <nav class="mobile">
        <Button isRound on:click={prev}>
          <svg src="/images/icons/chevron-left.svg" />
        </Button>
        <Button isRound on:click={next}>
          <svg src="/images/icons/chevron-right.svg" />
        </Button>
      </nav>
    </section>
  {/if}

  <section class="templates">
    Jumpstart your project with a template:
    <div class="actions">
      <Button on:click={create} href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/award.svg" class="icon mr" />
        Olympiad
      </Button>
      <Button on:click={create} href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/speaker.svg" class="icon mr" />
        Student Party
      </Button>
    </div>
    Or start completely from scratch:
    <div class="actions">
      <Button on:click={create} href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/package.svg" class="icon mr" />
        Blank Project
      </Button>
    </div>
  </section>
</div>
