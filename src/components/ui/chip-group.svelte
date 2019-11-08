<script>
  import { createEventDispatcher } from 'svelte';
  import Chip from 'ui/chip.svelte';

  export let items = [];
  export let value = null;
  export let multiple = false;
  export let classname = '';
  export let name = '';

  $: selected = multiple ? (value || []) : (value || {});
  let dispatch = createEventDispatcher();
  const check = (item) => {
    if (multiple) {
      if (selected.find(x => x.id === item.id)) selected = selected.filter(x => x.id !== item.id);
      else selected.push(item);
    } else {
      selected = item;
    }
    dispatch('change', selected);
  };
</script>

<div role="group" class={classname}>
  {#each items as item (item.id)}
    <Chip
            text={item.name}
            name={name}
            multiple={multiple}
            value={multiple ? selected.find(x => x.id === item.id) : selected.id === item.id}
            on:change={() => check(item)}
    />
  {/each}
</div>
