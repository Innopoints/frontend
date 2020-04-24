<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dialog from 'ui/dialog.svelte';
  import Modal from 'ui/modal.svelte';
  import Cropper from 'svelte-easy-crop';

  export let image;
  let crop = { x: 0, y: 0 };
  let pixels = null;
  export let aspectRatio = 1;
  export let isOpen = false;
  export let error = null;
  export let isUploading = false;

  function saveBounds(event) {
    pixels = event.detail.pixels;
  }

  const dispatch = createEventDispatcher();
</script>

<style>
  .image-resizer {
    position: relative;
    width: 15em;
    border-radius: .5em;
    overflow: hidden;
    height: 9em;
  }

  @media only screen and (min-width: 360px) {
    .image-resizer {
      width: 18em;
      height: 10em;
    }
  }

  @media only screen and (min-width: 640px) {
    .image-resizer {
      width: 32em;
      height: 18em;
    }
  }
</style>

<Modal bind:isOpen>
  {#if image != null}
    <Dialog
      title="Resize the image"
      closeCallback={() => isOpen = false}
    >
      <div class="image-resizer" slot="content">
        <Cropper {image} {crop} aspect={aspectRatio} on:cropcomplete={saveBounds} />
      </div>
      <div class="actions" slot="content">
        {#if error != null}
          {error}
        {/if}
        <Button isDanger on:click={() => isOpen = false} disabled={isUploading}>cancel</Button>
        <Button
          isFilled
          on:click={() => {
            isUploading = true;
            dispatch('uploading', isUploading);
            dispatch('image-cropped', pixels);
          }}
          disabled={isUploading}
        >
          {isUploading ? 'uploading...' : 'upload'}
        </Button>
      </div>
    </Dialog>
  {/if}
</Modal>
