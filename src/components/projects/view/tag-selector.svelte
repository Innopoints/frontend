<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Autocomplete, Chip, Dot } from 'attractions';
  import Labeled from 'src/components/common/labeled.svelte';

  export let tags;
  export let value = [];
  let valueTags = value.map(id => tags.find(tag => tag.id === id));
  let editing = false;

  // eslint-disable-next-line require-yield
  async function* getOptions(query) {
    let output = tags;
    if (query) {
      output = output.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()));
    }
    yield output.filter(tag => !value.includes(tag.id));
  }

  function toggleEditing() {
    if (editing) {
      dispatch('change', valueTags.map(tag => tag.id));
    }
    editing = !editing;
  }

  const dispatch = createEventDispatcher();
</script>

{#if valueTags.length > 0 || editing}
  <Labeled icon label="Tags" class="tags">
    <svg slot="icon" class="icon mr" src="static/images/icons/tag.svg" />
    <div class="tag-selector">
      {#if editing}
        <Autocomplete {getOptions} minSearchLength={0} bind:selection={valueTags} />
      {:else}
        <div class="tags">
          {#each valueTags as tag (tag.id)}
            <Chip small>{tag.name}</Chip>
          {/each}
        </div>
      {/if}
      <Button small class="ml" on:click={toggleEditing}>
        {editing ? 'save' : 'edit'}
      </Button>
    </div>
  </Labeled>
{:else}
  <Button class="mt" on:click={toggleEditing}>
    <svg class="mr" src="static/images/icons/tag.svg" />
    add tags
    <Dot info class="ml" />
  </Button>
{/if}

<style src="../../../../static/css/components/projects/view/tag-selector.scss"></style>
