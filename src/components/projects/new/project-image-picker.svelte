<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import FileInput from 'ui/file-input.svelte';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import maxSizeMB from '@/constants/backend/file-upload-limit.js';

  export let value = null;
  export let isUploading = false;
  let error = null;

  function validateUpload(event) {
    const file = event.target.files[0];
    if (file.size > maxSizeMB * 1024 * 1024) {
      error = `Selected file is too large (${maxSizeMB} MB max).`;
      isUploading = false;
      dispatch('uploading', isUploading);
      return;
    }
    dispatch('resize-image', file);
    event.target.value = '';
  }

  function clearValue() {
    value = null;
    error = null;
    isUploading = false;
    dispatch('uploading', isUploading);
  }

  const dispatch = createEventDispatcher();
</script>

{#if value != null}
  <img src="{API_HOST_BROWSER}/file/{value}" alt="Project cover" class="shadow-1 mr" />
  <Button isDanger on:click={clearValue} tooltip="Delete image">
    <svg src="images/icons/trash-2.svg" class="icon" />
    <span class="text">delete</span>
  </Button>
{:else if isUploading}
  <p>uploading...</p>
{:else}
  <div class="options">
    <FileInput on:change={validateUpload} accept="image/*" />
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>
{/if}
