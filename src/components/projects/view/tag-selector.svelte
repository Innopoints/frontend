<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import Labeled from 'ui/labeled.svelte';
  import UnclickableChip from 'ui/unclickable-chip.svelte';

  export let tags;
  export let value;
  let valueTags = value.map(id => tags.find(tag => tag.id === id));
  let editing = false;

  // eslint-disable-next-line require-yield
  async function *getOptions(query) {
    if (query) {
      return tags.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()));
    }
    return tags;
  }

  function toggleEditing() {
    if (editing) {
      dispatch('change', valueTags.map(tag => tag.id));
    }
    editing = !editing;
  }

  const dispatch = createEventDispatcher();
</script>

<Labeled icon label="Tags">
  <svg slot="icon" class="icon" src="images/icons/tag.svg" />
  <div class="tag-selector">
    {#if editing}
      <Autocomplete {getOptions} minSearchLength={0} bind:selection={valueTags} />
    {:else}
      <div class="tags">
        {#each valueTags as tag (tag.id)}
          <UnclickableChip small>{tag.name}</UnclickableChip>
        {/each}
      </div>
    {/if}
    <Button isSmall on:click={toggleEditing}>
      {editing ? 'save' : 'edit'}
    </Button>
  </div>
</Labeled>
