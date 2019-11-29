<script>
  import { createEventDispatcher } from 'svelte';
  import parseItems from './utils/parse-items-array';
  import parseValues from './utils/parse-values';
  import Chip from 'ui/chip.svelte';

  export let classname = '';
  export let chipclass = null;
  export let multiple = false;
  export let items = [];
  export let value = multiple ? [] : {};
  export let uniqueKey = null;
  export let name = '';

  $: parsedItems = parseItems(items);
  $: selected = parseValues(value, parsedItems, {uniqueKey, multiple}) || [];

  let dispatch = createEventDispatcher();
  const check = (item) => {
    if (multiple) {
      if (selected.some(x => x.id === item.id)) selected = selected.filter(x => x.id !== item.id);
      else selected.push(item);
    } else {
      selected = item;
    }
    dispatch('change', selected);
  };
</script>

<div role="group" class={classname}>
  {#each parsedItems as item (item.id)}
    <Chip
        classname={chipclass ? chipclass : undefined}
        label={item.label}
        name={name}
        multiple={multiple}
        disabled={item.disabled}
        value={multiple ? selected.some(x => x.id === item.id) : selected.id === item.id}
        on:change={() => check(item)}
    />
  {/each}
</div>
