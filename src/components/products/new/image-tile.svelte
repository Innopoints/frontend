<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Button, Card, Loading } from 'attractions';
  import getBackground from 'src/utils/optimal-color.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  export let file;
  let blobURL = null;
  if (file.type != null) {
    blobURL = URL.createObjectURL(file, { type: file.type });
  }
  const color = getContext('variety-color');

  const dispatch = createEventDispatcher();
</script>

<div class="image-tile">
  <Card tight>
    {#if file._id != null}
      {#await file._id}
        <div class="image-wrapper">
          <img
            src={blobURL || '/images/create-product/placeholder.svg'}
            style={getBackground($color)}
            alt={file.name}
          />
          <div class="status-overlay">
            <Loading />
            <p>Uploading...</p>
          </div>
        </div>
        <Button danger disabled>
          <svg src="images/icons/trash-2.svg" class="mr" />
          delete
        </Button>
      {:then id}
        <div class="image-wrapper">
          <img
            src="{API_HOST_BROWSER}/file/{id}"
            style={getBackground($color)}
            alt={file.name}
          />
        </div>
        <Button danger on:click={() => dispatch('delete', file)}>
          <svg src="images/icons/trash-2.svg" class="mr" />
          delete
        </Button>
      {:catch}
        <div class="image-wrapper">
          <img
            src={blobURL || '/images/create-product/placeholder.svg'}
            style={getBackground($color)}
            alt="Upload failed"
          />
          <div class="status-overlay error">
            <svg src="images/icons/x.svg" />
            <p>Upload failed</p>
          </div>
        </div>
        <Button danger on:click={() => dispatch('delete', file)}>
          <svg src="images/icons/trash-2.svg" class="mr" />
          delete
        </Button>
      {/await}
    {/if}
  </Card>
</div>

<style src="../../../../static/css/components/products/new/image-tile.scss"></style>
