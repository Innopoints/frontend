<script>
  import { Button, DropdownShell, Dropdown, CheckboxGroup } from 'attractions';

  export let groups;
  export let value = [];
  export let name;

  let items = null;

  function getItemsFromGroups(groups) {
    items = groups.map(group => ({ value: group, checked: value.includes(group) }));
  }

  function updateValueFromItems(items) {
    value = items.filter(item => item.checked).map(item => item.value);
  }

  $: getItemsFromGroups(groups);
  $: updateValueFromItems(items);
</script>

<div class="user-group-picker">
  <DropdownShell let:toggle>
    <Button on:click={toggle}>
      choose student groups
      <svg src="static/images/icons/chevron-down.svg" class="dropdown-chevron ml" />
    </Button>
    <Dropdown>
      <CheckboxGroup bind:items {name} />
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../static/css/components/common/user-group-picker.scss"></style>
