<script>
  import { createEventDispatcher } from 'svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import getBackground from '@/utils/optimal-color.js';

  export let image;
  export let color;
  export let index;
  export let url = null;
  let dataURL;
  let loading = true;
  let error = false;

  if (url == null) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(image.file);
    fileReader.onloadend = () => {
      dataURL = fileReader.result;
    };

    image.promise.then(resp => {
      loading = false;
      if (resp.status !== 200) {
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
      src={url || dataURL || '/images/create-product/placeholder.svg'}
      style="background: {getBackground(color)}"
      alt={url || image.file.name}
    />
    <div class="status-overlay">
      <div class="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
      <Button isRound isNormal classname="retry" on:click={() => console.log('implement me')}>
        <svg src="images/icons/refresh-cw.svg" class="icon" />
      </Button>
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
      {#if resp.status == 200}
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
        <div class="text error">
          Failed
        </div>
      {/if}
    {/await}
  {/if}
</Card>
