<script>
  import { onMount } from 'svelte';
  import Button from 'ui/button.svelte';
  import FileInput from 'ui/file-input.svelte';
  import * as api from '@/utils/api.js';
  import { API_HOST } from '@/constants/env.js';
  import maxSizeMB from '@/constants/backend/file-upload-limit.js';

  export let value = null;
  let promise = null;
  let dataURL = null;
  let error = null;
  let fileReader;
  onMount(() => {
    fileReader = new FileReader();
    fileReader.onloadend = () => dataURL = fileReader.result;
  });

  async function handleImageUpload(event) {
    let file = event.target.files[0];
    if (file.size > maxSizeMB * 1024 * 1024) {
      error = `Selected file is too large (${maxSizeMB} MB max).`;
      return;
    }

    fileReader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);

    promise = api.post('/file', {
      data: formData,
    });

    try {
      const resp = await promise;
      if (resp.ok) {
        value = (await resp.json()).id;
        error = null;
      } else {
        console.error(await resp.text());
        error = 'Upload failed. Try again.';
      }
    } catch (e) {
      console.error(e);
      error = 'Upload failed. Try again.';
    }
  }

  function clearValue() {
    value = null;
    promise = null;
    dataURL = null;
    error = null;
  }
</script>

{#if value != null}
  <img src="{API_HOST}/file/{value}" alt="Project image" class="shadow-1 mr" />
  <Button isDanger on:click={clearValue} tooltip="Delete image">
    <svg src="images/icons/trash-2.svg" class="icon" />
    <span class="text">delete</span>
  </Button>
{:else if promise != null}
  {#await promise.then(resp => resp.json()).catch(() => promise = null)}
    <div class="loading-wrapper shadow-1">
      <img
        src={dataURL || '/images/create-project/placeholder.svg'}
        alt="Project image"
      />
      <div class="status-overlay">
        <div class="lds-ellipsis">
          <div></div><div></div><div></div><div></div>
        </div>
      </div>
    </div>
  {:then image}
    <img src="{API_HOST}/file/{image.id}" alt="Project image" class="shadow-1 mr" />
    <Button isDanger on:click={clearValue} tooltip="Delete image">
      <svg src="images/icons/trash-2.svg" class="icon" />
      <span class="text">delete</span>
    </Button>
  {/await}
{:else}
  <div class="options">
    <FileInput on:change={handleImageUpload} accept="image/*" />
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>
{/if}
