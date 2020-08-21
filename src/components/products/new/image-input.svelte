<script>
  import { getContext } from 'svelte';
  import { FileDropzone } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ImageTile from 'src/components/products/new/image-tile.svelte';
  import MultiImageResizer from 'src/components/common/multi-image-resizer.svelte';
  import maxSizeMB from 'src/constants/backend/file-upload-limit.js';
  import ALLOWED_MIMETYPES from 'src/constants/backend/allowed-mimetypes.js';

  let imageResizer = null;
  let imageResizerOpen = false;

  function openResizer(file) {
    if (file.size > maxSizeMB * 1024 * 1024) {
      showSnackbar({ props: { text: `Can only upload images under ${maxSizeMB} MB` } });
      throw RangeError('File is too large');
    }

    imageResizerOpen = true;
    return imageResizer.add(file);
  }

  function convertToInternal(externalImage) {
    if (typeof externalImage === 'number') {
      return { _id: externalImage };
    }
    return externalImage;
  }

  export let value = [];
  export let internalValue = value.map(convertToInternal);

  async function updateValue({ detail }) {
    value = internalValue.map(file => file._id);
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<FileDropzone
  accept={ALLOWED_MIMETYPES.join(',')}
  bind:files={internalValue}
  fileComponent={ImageTile}
  beforeChange={openResizer}
  on:change={updateValue}
/>
<p>The first uploaded image will be used as a cover for the product card.</p>
<p>Prefer square (1:1) images.</p>
<MultiImageResizer bind:this={imageResizer} bind:open={imageResizerOpen} />

<style src="../../../../static/css/components/products/new/image-input.scss"></style>
