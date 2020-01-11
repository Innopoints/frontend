<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import StepHeader from '@/components/projects/new/step-header.svelte';
  import BottomNavigation from '@/components/projects/new/bottom-navigation.svelte';
  import Autocomplete from '@/components/projects/new/autocomplete.svelte';
  import {checkProject} from '@/store/new-project';
  import options from '@/constants/autocomplete-options';

  onMount(checkProject);
  let values = [];
</script>

<form transition:fade={{duration:200}}>
  <StepHeader subtitle="Step 3. Assign moderators for the project" />
  <p>
    Moderators can process applications from volunteers and edit activities.
    Feedback on volunteers is also shared between all moderators.
  </p>
  <p>You are the creator, therefore, also a moderator.</p>
  <span class="label">Search for people</span>
  <Autocomplete bind:value={values} {options} />
  <BottomNavigation />
</form>

<style>
  :global(.autocomplete-field .dropdown) {
    list-style: none;
  }
</style>
