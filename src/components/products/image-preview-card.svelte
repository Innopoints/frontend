<script>
  import { createEventDispatcher } from 'svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import getBackground from '@/utils/optimal-color.js';

  export let image;
  export let color;
  export let index;
  export let url = null;
  let blobURL;
  let loading = true;
  let error = false;

  if (url == null) {
    blobURL = URL.createObjectURL(image.file, { type: image.file.type });

    image.promise.then(resp => {
      loading = false;
      if (!resp.ok) {
        error = true;
      }
    });
  } else {
    loading = false;
  }

  const dispatch = createEventDispatcher();
</script>

<Card classname="image with-image {loading ? 'loading': ''} {error ? 'error' : ''}">
  <div class="image-wrapper">
    <img
      src={url || blobURL || '/images/create-product/placeholder.svg'}
      style="background: {getBackground(color)}"
      alt={url || image.file.name}
    />
    <div class="status-overlay">
      <div class="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  </div>
  {#if url}
    <div class="actions">
      <svg src="images/icons/drag-handle.svg" class="drag-handle" />
      <Button
        isDanger
        isRound
        tooltip="Delete image"
        on:click={(e) => { e.preventDefault(); dispatch('delete-file', { fileIndex: index }); }}
      >
        <svg src="images/icons/trash-2.svg" class="icon" />
      </Button>
    </div>
  {:else}
    {#await image.promise}
      <div class="text loading">
        Uploading...
      </div>
    {:then resp}
      <div class="actions">
        <svg src="images/icons/drag-handle.svg" class="drag-handle" />
        <Button
          isDanger
          isRound
          tooltip="Delete image"
          on:click={(e) => { e.preventDefault(); dispatch('delete-file', { fileIndex: index }); }}
        >
          <svg src="images/icons/trash-2.svg" class="icon" />
        </Button>
      </div>
    {/await}
  {/if}
</Card>
