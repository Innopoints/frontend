<script>
  import { getContext } from 'svelte';
  import { stores } from '@sapper/app';
  import { FileDropzone } from 'attractions';
  import { snackbarContextKey } from 'attractions/snackbar';
  import ImageTile from '@/components/products/new/image-tile.svelte';
  import maxSizeMB from '@/constants/backend/file-upload-limit.js';
  import ALLOWED_MIMETYPES from '@/constants/backend/allowed-mimetypes.js';
  import * as api from '@/utils/api.js';

  const { session } = stores();

  function startUpload(file) {
    if (file.size > maxSizeMB * 1024 * 1024) {
      showSnackbar({ props: { text: `Can only upload images under ${maxSizeMB} MB` } });
      throw RangeError('File is too large');
    }

    const formData = new FormData();
    formData.append('file', file);
    file._id = api.json(api.post('/file', {
      data: formData,
      csrfToken: $session.account.csrf_token,
    })).then(data => data.id);
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
    value = (
      (await Promise.all(internalValue.map(file => Promise.resolve(file._id).catch(e => null))))
        .filter(id => id != null)
    );
  }

  const showSnackbar = getContext(snackbarContextKey);
</script>

<FileDropzone
  accept={ALLOWED_MIMETYPES.join(',')}
  bind:files={internalValue}
  fileComponent={ImageTile}
  beforeChange={startUpload}
  on:change={updateValue}
/>
<p>The first uploaded image will be used as a cover for the product card.</p>
<p>Prefer square (1:1) images.</p>

<style src="../../../../static/css/components/products/new/image-input.scss"></style>
