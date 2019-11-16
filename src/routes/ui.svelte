<script>
  import Layout from '@/layouts/default.svelte';
  import Accordions from '@/containers/ui/accordions.svelte';
  import Buttons from '@/containers/ui/buttons.svelte';
  import Checkboxes from '@/containers/ui/checkboxes.svelte';
  import Chips from '@/containers/ui/chips.svelte';
  import Dots from '@/containers/ui/dots.svelte';
  import Dropdowns from '@/containers/ui/dropdowns.svelte';
  import Labeleds from '@/containers/ui/labeleds.svelte';
  import Radios from '@/containers/ui/radios.svelte';
  import Switches from '@/containers/ui/switches.svelte';
  import TextFields from '@/containers/ui/text-fields.svelte';
  import Others from '@/containers/ui/others.svelte';
</script>

<svelte:head>
  <title>UI Showcase – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/global/ui-kit-page.css" />

  <style>
    .material {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
    .todo {
      background-color: red;
      width: 100%;
    }
    header.top-level { width: 100%; }
    footer { width: 100%; }
    .flex-wrap {
      display: flex;
      flex-wrap: wrap;
    }
  </style>
</svelte:head>

<Layout>
  <Buttons />
  <TextFields />
  <Radios />
  <Checkboxes />
  <Switches />
  <Labeleds />
  <Dropdowns />
  <Accordions />
  <Dots />
  <Chips />
  <Others />
</Layout>
