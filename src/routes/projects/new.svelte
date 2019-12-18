<script>
  import StepZero from '@/containers/projects/new/step-0.svelte';
  import Layout from '@/layouts/default.svelte';
</script>

<svelte:head>
  <title>Create project – Innopoints</title>
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/create-project/steps.css">
  <link rel="stylesheet" href="/css/page-components/create-activity.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Layout classname="step0">
  <StepZero />
</Layout>
