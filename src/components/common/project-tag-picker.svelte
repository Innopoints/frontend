<script>
  import { Button, DropdownShell, Dropdown, RadioGroup, Divider } from 'attractions';

  export let tags;
  export let value = null;
  export let name;

  $: items = tags.map(tag => ({ value: tag.id, label: tag.name }));
</script>

<div class="project-tag-picker">
  <DropdownShell let:toggle>
    <Button on:click={toggle}>
      select a project tag
      <svg src="static/images/icons/chevron-down.svg" class="dropdown-chevron ml" />
    </Button>
    <Dropdown>
      {#if items != null && items.length !== 0}
        <RadioGroup {items} bind:value {name} class="tags" />
        {#if value != null}
          <Divider />
          <Button small on:click={(e) => { e.stopPropagation(); value = null; }}>
            clear selection
          </Button>
        {/if}
      {:else}
        No tags yet...
      {/if}
    </Dropdown>
  </DropdownShell>
</div>

<style src="../../../static/css/components/common/project-tag-picker.scss"></style>
