<script>
  import Button from 'ui/button.svelte';
  import Layout from '@/layouts/default.svelte';
</script>

<svelte:head>
  <title>Create project – Innopoints</title>
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/create-project/step0.css" />
  <link rel="stylesheet" href="/css/page-components/activity.css" />
  <link rel="stylesheet" href="/css/page-components/create-activity.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Layout>
  <div class="left">
    <h1>Create a Project</h1>
    <div class="subtitle">
      Unleash your creative genius — we're here to help you!
    </div>
    <img class="illustration" src="/images/create-project/create-project.svg" alt="">
  </div>
  <div class="right">
    <h2>Starting Point</h2>

    <section class="drafts">
      You could continue from one of your drafts:
      <div class="cards">
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
</Layout>
