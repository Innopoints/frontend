<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { Button, Dialog, Modal, Divider, Loading } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import Cropper from 'svelte-easy-crop';
  import * as api from 'src/utils/api.js';

  const { session } = stores();

  export let aspectRatio = 1;
  export let open = false;

  let currentImage = 0;
  let images = [];

  const crop = { x: 0, y: 0 };

  function saveBounds({ detail }) {
    images[currentImage].pixels = detail.pixels;
  }

  function resetCropArea() {
    crop.x = 0;
    crop.y = 0;
  }

  async function repositionCursor() {
    for (let idx = 0; idx < images.length; ++idx) {
      if (images[idx].uploadPromise == null) {
        currentImage = idx;
        resetCropArea();
        return;
      }
    }

    try {
      currentImage = null;
      await Promise.all(images.map(image => image.uploadPromise));
    } finally {
      open = false;
      images = [];
      currentImage = 0;
    }
  }

  function dismissImage(image = null) {
    image.reject();
    images = images.filter(thatImage => thatImage !== image);
    repositionCursor();
  }

  async function applyCrop() {
    const image = images[currentImage];
    const formData = new FormData();
    formData.append('file', image.file);
    formData.append('x', image.pixels.x);
    formData.append('y', image.pixels.y);
    formData.append('width', image.pixels.width);
    formData.append('height', image.pixels.height);

    try {
      image.uploadPromise = api.json(api.post('/file', {
        data: formData,
        csrfToken: $session.account.csrf_token,
      }));
      repositionCursor();
      image.file._id = (await image.uploadPromise).id;
      image.resolve();
    } catch (e) {
      showSnackbar({ props: { text: 'Failed to upload image, try reloading the page' } });
      console.error(e);
      dismissImage(image);
    }
  }

  export function add(image) {
    const imageObject = {
      file: image,
      url: URL.createObjectURL(image, { type: image.type }),
      uploadPromise: null,
      resolve: null,
      reject: null,
    };

    images.push(imageObject);
    images = images;

    return new Promise((resolve, reject) => {
      imageObject.resolve = resolve;
      imageObject.reject = reject;
    });
  }

  function alertOnClose({ detail }) {
    if (!detail.value) {
      for (const image of images) {
        if (image.uploadPromise == null) {
          image.reject();
        }
      }

      images = [];
      currentImage = 0;
    }
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Modal bind:open let:closeCallback on:change={alertOnClose}>
  {#if images.length !== 0}
    <Dialog title="Resize the images" {closeCallback}>
      <p>Drag to move, pinch or scroll to zoom</p>
      <div class="image-resizer">
        <Cropper
          image={images[currentImage] && images[currentImage].url}
          {crop}
          aspect={aspectRatio}
          on:cropcomplete={saveBounds}
        />
      </div>
      <div class="actions">
        <Button
          danger
          on:click={() => dismissImage(images[currentImage])}
          disabled={images[currentImage] == null}
        >
          <svg src="static/images/icons/x.svg" class="mr" />
          remove image
        </Button>
        <Button on:click={applyCrop} disabled={images[currentImage] == null}>
          <svg src="static/images/icons/check.svg" class="mr" />
          crop image
        </Button>
      </div>
      <Divider />
      <div class="image-thumbnails">
        {#each images as image, index}
          <label class="image-preview">
            <input
              type="radio"
              name="resizer"
              value={index}
              bind:group={currentImage}
              disabled={image.uploadPromise != null}
              on:change={resetCropArea}
            />
            <img src={image.url} alt="" />
            {#if image.uploadPromise != null}
              {#await image.uploadPromise}
                <div class="overlay">
                  <Loading />
                </div>
              {:then _}
                <div class="overlay success">
                  <svg src="static/images/icons/check.svg" />
                </div>
              {/await}
            {/if}
          </label>
        {/each}
      </div>
    </Dialog>
  {/if}
</Modal>

<style src="../../../static/css/components/common/multi-image-resizer.scss"></style>
