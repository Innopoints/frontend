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
  import Modals from '@/containers/ui/modals.svelte';
  import ModalTriggers from '@/containers/ui/modal-triggers.svelte';
  import Others from '@/containers/ui/others.svelte';
  import Tabs from '@/containers/ui/tabs.svelte';
  import Popovers from '@/containers/ui/popovers.svelte';
  import Autocompletes from '@/containers/ui/autocompletes.svelte';
  import StarRatings from '@/containers/ui/star-ratings.svelte';
  import DatePickers from '@/containers/ui/date-pickers.svelte';

  let m1 = false;
  let m2 = false;
</script>

<svelte:head>
  <title>UI Showcase – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/page-components/modal-dialog.css" />
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/global/ui-kit-page.css" />
</svelte:head>

<Layout>
  <div class="material">
    <Buttons />
    <TextFields />
    <DatePickers />
    <Radios />
    <Checkboxes />
    <Switches />
    <Labeleds />
    <Dropdowns />
    <ModalTriggers bind:m1={m1} bind:m2={m2} />
    <Accordions />
    <Autocompletes />
    <Dots />
    <Chips />
    <Others />
    <Tabs />
    <Popovers />
    <StarRatings />
  </div>
  <Modals bind:m1={m1} bind:m2={m2} />
</Layout>
