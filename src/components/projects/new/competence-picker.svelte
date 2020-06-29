<script>
  import { DropdownShell, Dropdown, CheckboxGroup, Button, Badge } from 'attractions';

  export let competences;
  export let value;

  $: competenceOptions = competences.map(competence => ({
    label: competence.name,
    value: competence.id,
    checked: value.includes(competence.id),
  }));

  function processCheckboxChange({ detail: competence }) {
    if (competence.checked) {
      value.push(parseInt(competence.value));
      value = value;
    } else {
      value = value.filter(id => id != competence.value);
    }
  }
</script>

<DropdownShell let:toggle>
  <Button on:click={toggle}>
    select competences
    <Badge hidden={value.length !== 0}>
      <svg class="ml dropdown-chevron" src="images/icons/chevron-down.svg" />
    </Badge>
  </Button>
  <Dropdown>
    <div class="competence-list">
      <CheckboxGroup
        name="competences"
        max={3}
        items={competenceOptions}
        on:change={processCheckboxChange}
      />
    </div>
  </Dropdown>
</DropdownShell>

<style src="../../../../static/css/components/projects/new/competence-picker.scss"></style>
