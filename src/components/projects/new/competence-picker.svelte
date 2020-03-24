<script>
  import { createEventDispatcher } from 'svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';

  export let competences;
  export let activityIndex;
  export let value;
  export let errorNotSpecified;

  $: competenceOptions = competences.map(competence => ({
    value: competence.id,
    checked: value.includes(competence.id),
  }));
  $: competenceLabels = competences.map(competence => competence.name);

  function processCheckboxChange({ detail: competence }) {
    if (competence.checked) {
      value.push(competence.value);
      value = value;
    } else {
      value = value.filter(id => id !== competence.value);
    }
    errorNotSpecified = value.length === 0;
    dispatch('change', value);
  }

  const dispatch = createEventDispatcher();
</script>

<Dropdown label="select competences" dropdownclass="btn-shift" noclose nowrap>
  <CheckboxGroup
    name="competences{activityIndex}"
    maxChecked={3}
    items={competenceOptions}
    labels={competenceLabels}
    on:change={processCheckboxChange}
  />
</Dropdown>
