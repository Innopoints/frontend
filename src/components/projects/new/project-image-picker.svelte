<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { FileInput, Button } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ImageResizer from '@/components/common/image-resizer.svelte';
  import { API_HOST_BROWSER } from '@/constants/env.js';
  import maxSizeMB from '@/constants/backend/file-upload-limit.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();
  const aspectRatio = 16 / 9;

  export let value = null;

  let imageResizerOpen = false;
  let inputValue = null;
  let uploading = false;
  let uploadCancelled = false;
  let uploadController = null;
  $: inputValueURL = inputValue && URL.createObjectURL(inputValue, { type: inputValue.type });

  function validateUpload({ detail }) {
    if (detail.value.size > maxSizeMB * 1024 * 1024) {
      showSnackbar({ props: { text: `Selected file is too large (${maxSizeMB} MB max)` } });
      inputValue = null;
    } else {
      imageResizerOpen = true;
    }
  }

  async function uploadImage({ detail: pixels }) {
    const formData = new FormData();
    formData.append('file', inputValue);
    formData.append('x', pixels.x);
    formData.append('y', pixels.y);
    formData.append('width', pixels.width);
    formData.append('height', pixels.height);

    uploading = true;
    uploadCancelled = false;
    uploadController = null;
    try {
      if (typeof AbortController !== 'undefined') {
        uploadController = new AbortController();
      }

      const resp = await api.json(api.post('/file', {
        data: formData,
        csrfToken: $session.account.csrf_token,
        signal: uploadController && uploadController.signal,
      }));

      if (!uploadCancelled) {
        value = resp.id;
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        showSnackbar({ props: { text: 'Upload failed, try reloading the page' } });
        console.error(e);
      }
    }
    uploading = false;
    imageResizerOpen = false;
  }

  function dismissResize() {
    inputValue = null;
    if (uploading) {
      uploadCancelled = true;
      uploading = false;
      uploadController && uploadController.abort();
      showSnackbar({ props: { text: 'Upload cancelled' } });
    }
  }

  function clearValue() {
    value = null;
    inputValue = null;
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

{#if value != null}
  <div class="uploaded-image">
    <img src="{API_HOST_BROWSER}/file/{value}" alt="Project cover" class="shadow-1 mr" />
    <Button danger round on:click={clearValue}>
      <svg src="images/icons/trash-2.svg" />
    </Button>
  </div>
{:else}
  <FileInput accept="image/*" bind:value={inputValue} on:change={validateUpload}>
    <svg class="mr" src="images/icons/image.svg" />
    upload an image
  </FileInput>
{/if}

<ImageResizer
  {aspectRatio}
  {uploading}
  imageURL={inputValueURL}
  bind:open={imageResizerOpen}
  on:dismiss={dismissResize}
  on:image-crop={uploadImage}
/>

<style src="../../../../static/css/components/projects/new/project-image-picker.scss"></style>
