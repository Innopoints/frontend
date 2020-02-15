<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import TextField from 'ui/text-field.svelte';

  export let value = [];
  const dispatch = createEventDispatcher();

  function changeValue(index, event) {
    value[index] = event.detail;
    dispatch('change', value);
  }

  function removeValue(index) {
    value = value.filter((x, i) => i !== index);
    dispatch('change', value);
  }

  function addValue() {
    value = [...value, ''];
    dispatch('change', value);
  }
</script>

<Dropdown dropdownclass="btn-shift" noclose let:toggle>
  <svg src="/images/icons/message-circle.svg" class="icon mr" slot="label" />
  <span slot="label">customize</span>
  <span class="label">Feedback questions</span>
  {#each value as val, i (i)}
    <div class="row">
      <TextField value={val} on:change={(e) => changeValue(i, e)} />
      <Button isDanger isRound on:click={() => removeValue(i)}>
        <svg src="/images/icons/trash-2.svg" />
      </Button>
    </div>
  {/each}
  <div class="actions">
    <Button on:click={addValue}>
      <svg src="/images/icons/plus.svg" class="icon mr" />
      add
    </Button>
    <Button on:click={toggle} isFilled>
      <svg src="/images/icons/check.svg" class="icon mr" />
      save
    </Button>
  </div>
</Dropdown>
