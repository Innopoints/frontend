<script>
  import Button from 'ui/button.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';
  import {filters, changeCompetences} from '@/store/projects';
  import competencesOptions from '@/constants/projects/competences';

  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();

  export let open = false;
  $: value = open;
</script>

<li class:open={value} class="filter competences panel">
  <svg src="images/icons/tag.svg" class="icon mr" />
  <Button chevron classname="handle" on:click={() => dispatch('toggle')}>
    select competences
  </Button>
</li>
<section>
  <Button>clear all</Button>
  <CheckboxGroup
      labeled
      items={competencesOptions}
      checked={$filters.competences}
      name="competences"
      on:change={(e) => changeCompetences(e.detail)}
  />
</section>
