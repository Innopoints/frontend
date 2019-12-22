<script>
  import { fade } from 'svelte/transition';

  import Button from 'ui/button.svelte';
  import DraftCard from '@/components/projects/new/draft-card.svelte';
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

  <section class="drafts">
    You could continue from one of your drafts:
    <div class="cards">
      <Button classname="btn round tablet">
        <svg src="/images/icons/chevron-left.svg" />
      </Button>
      <DraftCard title="Some project" subtitle="Try it" />
      <DraftCard title="Slippers of the Year 2019" subtitle="draft from 21.09.19" />
      <Button classname="btn round tablet">
        <svg src="/images/icons/chevron-right.svg" />
      </Button>
    </div>
    <nav class="mobile">
    </nav>
  </section>

  <section class="templates">
    Jumpstart your project with a template:
    <div class="actions">
      <Button href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/award.svg" class="icon mr" />
        Olympiad
      </Button>
      <Button href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/speaker.svg" class="icon mr" />
        Student Party
      </Button>
    </div>
    Or start completely from scratch:
    <div class="actions">
      <Button href="/projects/new?step=1" isOutline isRectangle>
        <svg src="/images/icons/package.svg" class="icon mr" />
        Blank Project
      </Button>
    </div>
  </section>
</div>
