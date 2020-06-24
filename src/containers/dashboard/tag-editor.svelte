<script>
  import { getContext } from 'svelte';
  import { Card, Button, TextField } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import * as api from '@/utils/api.js';

  export let tags = [];
  export let account;

  let modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
  let toCreate = [];
  $: toDelete = modifiedTags.filter(tag => tag.forDeletion);
  let toEdit = [];

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
    if (toCreate.some(tag => tags.find(thatTag => thatTag.name === tag.name))) {
      showSnackbar({ props: { text: 'No duplicate tags allowed' } });
      toCreate = toCreate.filter(tag => tags.find(thatTag => thatTag.name === tag.name) == null);
    }

    try {
      const requests = [];
      for (let tag of toCreate.filter(thatTag => !thatTag.forDeletion)) {
        delete tag.forDeletion;
        requests.push(api.json(api.post('/tags', {
          data: tag,
          csrfToken: account.csrf_token,
        })));
      }
      for (let tag of toDelete.filter(thatTag => thatTag.id != null)) {
        requests.push(api.json(api.del(`/tags/${tag.id}`, {
          csrfToken: account.csrf_token,
        })));
      }
      for (let tag of toEdit.filter(thatTag => !thatTag.forDeletion)) {
        requests.push(api.json(api.patch(`/tags/${tag.id}`, {
          data: { name: tag.name },
          csrfToken: account.csrf_token,
        })));
      }
      await Promise.all(requests);
      tags = await api.json(api.get('/tags'));
      modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
      showSnackbar({ props: { text: 'Successfully updated tags' } });
      toCreate = [];
      toEdit = [];
    } catch (e) {
      showSnackbar({ props: { text: 'Something went wrong, try reloading the page' } });
      modifiedTags = tags.map(tag => ({ forDeletion: false, ...tag }));
      console.error(e);
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Card class="tag-editor">
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
            danger
            class="ml"
            on:click={() => { tag.forDeletion = true; modifiedTags = modifiedTags; }}
          >
            <svg class="mr" src="images/icons/trash-2.svg" />
            delete
          </Button>
        {/if}
      </li>
    {/each}
  </ul>

  <div class="actions">
    <Button on:click={addNewTag}>
      <svg class="mr" src="images/icons/plus.svg" />
      add a new tag
    </Button>
    {#if isChanged}
      <Button filled on:click={saveTags} class="ml-2">
        <svg class="mr" src="images/icons/check.svg" />
        save
      </Button>
    {/if}
  </div>
</Card>


<style src="../../../static/css/containers/dashboard/tag-editor.scss"></style>
