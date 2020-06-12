<script>
  import { createEventDispatcher } from 'svelte';
  import { Button, Dialog, Modal, Loading } from 'attractions';
  import Cropper from 'svelte-easy-crop';

  export let imageURL;
  export let aspectRatio = 1;
  export let open = false;
  export let uploading = false;

  let crop = { x: 0, y: 0 };
  let pixels = null;

  function saveBounds(event) {
    pixels = event.detail.pixels;
  }

  function alertOnClose({ detail }) {
    if (!detail.value) {
      dispatch('dismiss');
    }
  }

  const dispatch = createEventDispatcher();
</script>

<Modal bind:open let:closeCallback on:change={alertOnClose}>
  {#if imageURL != null}
    <Dialog title="Resize the image" {closeCallback}>
      <p>Drag to move, pinch or scroll to zoom</p>
      <div class="image-resizer">
        <Cropper image={imageURL} {crop} aspect={aspectRatio} on:cropcomplete={saveBounds} />
      </div>
      {#if uploading}
        <div class="uploading">
          <Loading class="mr" />
          uploading...
        </div>
      {:else}
        <div class="actions">
          <Button danger on:click={closeCallback}>cancel</Button>
          <Button filled on:click={() => dispatch('image-crop', pixels)}>upload</Button>
        </div>
      {/if}
    </Dialog>
  {/if}
</Modal>

<style src="../../../static/css/components/common/image-resizer.scss"></style>
