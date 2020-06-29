<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from '@sapper/app';
  import Sortable from 'sortablejs';
  import ImagePreviewCard from 'src/components/products/image-preview-card.svelte';
  import * as api from 'src/utils/api.js';
  import maxSizeMB from 'src/constants/backend/file-upload-limit.js';

  const { session } = stores();

  export let index;
  export let images;
  export let color;
  let error = null;
  let dragActive = false;

  let emptyLayer;
  let dropzoneLayer;
  let inputElement;
  let fileCards;

  const dispatch = createEventDispatcher();

  function handleDragEnter(e) {
    dragActive = true;
  }

  function handleDragLeave(e) {
    dragActive = false;
  }

  function handleFileDrop(e) {
    upload(e.dataTransfer.files);
    e.target.value = '';
    dragActive = false;
  }

  function handleFileUpload(e) {
    upload(e.target.files);
    e.target.value = '';
  }

  function upload(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxSizeMB * 1024 * 1024) {
        error = `Can only upload images under {maxSizeMB} MB. Allowed formats: JPG, PNG, WEBP.`;
        setTimeout(() => error = null, 4000);
        continue;
      }

      if (images.some(img => img.file.name === file.name)) {
        error = 'You have already uploaded this image';
        setTimeout(() => error = null, 4000);
      }

      const formData = new FormData();
      formData.append('file', file);
      let promise = api.post('/file', {
        data: formData,
        csrfToken: $session.account.csrf_token,
      });
      let placementIndex = images.length;
      images.push({ file, promise });
      promise
        .then(resp => {
          if (!resp.ok) {
            throw resp.status;
          }
          return resp.json();
        })
        .then(data => dispatch('new-file', {
          id: data.id,
          fileIndex: placementIndex,
          varietyIndex: index,
        }))
        .catch(e => {
          images.splice(placementIndex, 1);
          images = images;
          error = 'Upload failed. Please, try again.';
          setTimeout(() => error = null, 4000);
        });
      images = images;
    }
  }

  function attachVarietyIndex({ detail }) {
    detail.varietyIndex = index;
    dispatch('delete-file', detail);
  }

  function checkCards(e) {
    if (e.target != emptyLayer && e.target != dropzoneLayer && e.target != inputElement) {
      e.preventDefault();
    }
  }

  let sortable = null;
  $: {
    if (fileCards && sortable == null) {
      sortable = new Sortable(fileCards, {
        handle: '.drag-handle',
        draggable: '.card.image',
        animations: 150,
        onEnd: (e) => { e.varietyIndex = index; dispatch('swap-files', e); },
      });
    }
  }
</script>

<style>
  :global(.image-platform .card img) {
    width: auto;
  }
  :global(.image-platform) {
    cursor: pointer;
  }
  :global(.image-platform .card) {
    cursor: default;
  }
</style>

<label
  class="image-platform{images.length ? ' has-content' : ''}"
  on:click={checkCards}
>
  <input
    type="file"
    id="file-input{index}"
    accept="image/*"
    multiple
    on:change={handleFileUpload}
    bind:this={inputElement}
  >
  <div class="empty-layer" bind:this={emptyLayer}>
    <svg src="/images/icons/image.svg" class="icon mr" />
    <div class="title">drag &amp; drop here or click to upload photos</div>
    <small>Make sure the aspect ratio is 1:1 (square)</small>
  </div>
  <div
    class="dropzone-layer"
    bind:this={dropzoneLayer}
    class:accepting={dragActive}
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:dragover|preventDefault
    on:drop|preventDefault={handleFileDrop}
  />
  {#if images.length}
    <div class="images" bind:this={fileCards}>
      {#each images as image, i (image.file.name)}
        {#if 'url' in image}
          <ImagePreviewCard
            url={image.url}
            index={i}
            on:delete-file={attachVarietyIndex}
            {image} {color}
          />
        {:else}
          <ImagePreviewCard {image} {color} index={i} on:delete-image={attachVarietyIndex} />
        {/if}
      {/each}
    </div>
    <svg src="images/icons/image.svg" class="icon mr" />
  {/if}
</label>
{#if error}
  <p class="error">
    {error}
  </p>
{/if}
