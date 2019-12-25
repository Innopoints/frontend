<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import TextField from 'ui/text-field.svelte';
  const dispatch = createEventDispatcher();

  export let value = [];
  const changeValue = (index, val) => {
    value[index] = val;
    dispatch('change', value);
  };
  const removeValue = (index) => {
    value = value.filter((x, i) => i !== index);
    dispatch('change', value);
    dispatch('save');
  };
  const addValue = () => {
    value = [...value, ''];
    dispatch('change', value);
  };

  let open = false;
  const save = () => {
    dispatch('save');
    open = false;
  };
  const close = (isOpen) => {
    if (!isOpen) dispatch('save');
  };
</script>

<Dropdown
  bind:value={open}
  dropdownclass="dropdown btn-shift"
  noclose
  on:change={e => close(e.detail)}
>
  <svg src="/images/icons/message-circle.svg" class="icon mr" slot="label" />
  <span slot="label">customize</span>
  <span class="label">Feedback questions</span>
  {#each value as val, i (val)}
    <div class="row">
      <TextField
        value={val}
        on:delayedChange={(e) => changeValue(i, e.detail)}
        on:blur={() => dispatch('save')}
      />
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
    <Button on:click={save} isFilled>
      <svg src="/images/icons/check.svg" class="icon mr" />
      save
    </Button>
  </div>
</Dropdown>
