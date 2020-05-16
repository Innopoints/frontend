<script>
  import { stores } from '@sapper/app';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  export let tags = [];
  let modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
  let toCreate = [];
  $: toDelete = modifiedTags.filter(tag => tag.forDeletion);
  let toEdit = [];
  let success = false;
  let error = null;

  $: console.log('cr', toCreate);
  $: console.log('dl', toDelete);
  $: console.log('ed', toEdit);

  $: isChanged = (
    toCreate.filter(thatTag => !thatTag.forDeletion).length
    || toDelete.filter(thatTag => thatTag.id != null).length
    || toEdit.filter(thatTag => !thatTag.forDeletion).length
  );

  function addNewTag() {
    const newTag = { name: '', forDeletion: false };
    toCreate.push(newTag);
    toCreate = toCreate;
    modifiedTags.push(newTag);
    modifiedTags = modifiedTags;
  }

  function recordChanges(tag) {
    if (tag.id != null) {
      const originalTag = tags.find(thatTag => thatTag.id === tag.id);
      toEdit = toEdit.filter(thatTag => thatTag.id !== tag.id);
      if (originalTag.name !== tag.name) {
        toEdit.push(tag);
        toEdit = toEdit;
      }
    }
  }

  async function saveTags() {
    console.log('5cr', toCreate);
    console.log('5dl', toDelete);
    console.log('5ed', toEdit);
    if (toCreate.some(tag => tags.find(thatTag => thatTag.name === tag.name))) {
      error = 'no duplicates allowed';
      return;
    }

    try {
      const requests = [];
      for (let tag of toCreate.filter(thatTag => !thatTag.forDeletion)) {
        delete tag.forDeletion;
        requests.push(api.json(api.post('/tags', {
          data: tag,
          csrfToken: $session.account.csrf_token,
        })));
      }
      for (let tag of toDelete.filter(thatTag => thatTag.id != null)) {
        requests.push(api.json(api.del(`/tags/${tag.id}`, {
          csrfToken: $session.account.csrf_token,
        })));
      }
      for (let tag of toEdit.filter(thatTag => !thatTag.forDeletion)) {
        requests.push(api.json(api.patch(`/tags/${tag.id}`, {
          data: { name: tag.name },
          csrfToken: $session.account.csrf_token,
        })));
      }
      await Promise.all(requests);
      tags = await api.json(api.get('/tags'));
      modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
      success = true;
      error = null;
      setTimeout(() => success = false, 1500);
      toCreate = [];
      toEdit = [];
    } catch (e) {
      error = 'failed, please, retry :(';
      modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
      setTimeout(() => error = null, 1500);
      console.error(e);
    }
  }
</script>

<style>
  ul {
    margin-top: 1em;
  }

  li {
    margin-top: .5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li :global(.text-field) {
    flex: 1;
  }

  .actions {
    justify-content: space-between !important;
  }

  .saver {
    display: flex;
    align-items: center;
  }

  .status {
    font-size: .9rem;
    font-weight: 300;
  }
</style>

<Card classname="tag-editor">
  <div class="title">
    <svg src="images/icons/tag.svg" class="icon" />
    Project tags
  </div>
  <ul>
    {#each modifiedTags as tag}
      <li>
        {#if tag.forDeletion}
          <p>Tag '{tag.name}' deleted</p>
          <Button on:click={() => { tag.forDeletion = false; modifiedTags = modifiedTags; }}>
            undo
          </Button>
        {:else}
          <TextField
            bind:value={tag.name}
            on:change={() => recordChanges(tag)}
            maxlength={128}
          />
          <Button
            isDanger
            classname="ml"
            on:click={() => { tag.forDeletion = true; modifiedTags = modifiedTags; }}
          >
            <svg class="icon mr" src="images/icons/trash-2.svg" />
            delete
          </Button>
        {/if}
      </li>
    {/each}
  </ul>

  <div class="actions">
    <Button on:click={addNewTag}>
      <svg class="icon mr" src="images/icons/plus.svg" />
      add a new tag
    </Button>
    {#if isChanged || success || error}
      <div class="saver">
        {#if success}
          <span class="status good">success!</span>
        {:else if error}
          <span class="status bad">{error}</span>
        {/if}
        <Button isFilled on:click={saveTags} classname="ml-2">
          <svg class="icon mr" src="images/icons/check.svg" />
          save
        </Button>
      </div>
    {/if}
  </div>
</Card>
