<script>
  import {step, changeStep} from '@/store/new-project';
  import { stores } from '@sapper/app';

  import Layout from '@/layouts/auth.svelte';
  import StepZero from '@/containers/projects/new/step-0.svelte';
  import StepOne from '@/containers/projects/new/step-1.svelte';
  import StepTwo from '@/containers/projects/new/step-2.svelte';
  import StepThree from '@/containers/projects/new/step-3.svelte';

  const { page } = stores();
  $: changeStep(parseInt($page.query.step || 0));
</script>

<svelte:head>
  <title>Create Project – Innopoints</title>
  <link rel="stylesheet" href="/css/page-components/header.css" />
  <link rel="stylesheet" href="/css/create-project/steps.css">
  <link rel="stylesheet" href="/css/create-project/main.css">
  <link rel="stylesheet" href="/css/create-project/general.css">
  <link rel="stylesheet" href="/css/create-project/activity.css">
  <link rel="stylesheet" href="/css/create-project/actions.css">
  <link rel="stylesheet" href="/css/page-components/create-activity.css" />
  <link rel="stylesheet" href="/css/page-components/image-platform.css" />
  <link rel="stylesheet" href="/css/page-components/403.css" />
  <link rel="stylesheet" href="/css/page-components/footer.css" />
</svelte:head>

<Layout classname="step{$step}" title="Create project">
  {#if $step === 0}
    <StepZero />
  {:else if $step === 1}
    <StepOne />
  {:else if $step === 2}
    <StepTwo />
  {:else if $step === 3}
    <StepThree />
  {/if}
</Layout>
