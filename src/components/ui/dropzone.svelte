<script>
  import { createEventDispatcher } from 'svelte';
  export let classname = '';
  export let inputclass = '';
  export let id = '';
  export let value = [];
  export let accept = 'image/*';
  export let maxSize = null;
  export let multiple = true;
  export let disabled = false;
  export let disabledElements = [];
  export let disabledQuerySelector = null;

  $: files = value;

  let filePlatform = null;
  const dispatch = createEventDispatcher();
  const fileClick = (e) => {
    if (disabled) return;
    if (disabledElements.length && disabledElements.some(el => el.contains(e.target))) return;
    if (disabledQuerySelector && e.target.closest(disabledQuerySelector)) return;

    filePlatform.click();
  };
  const inputChange = e => upload(e.target.files);

  const handleDrag = e => {
    e.preventDefault();
    dispatch(e.type);
  };
  const drop = (e) => {
    e.preventDefault();
    upload(e.dataTransfer.files);
  };

  const upload = newFiles => {
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (maxSize) {
        if (file.size > maxSize * 1024 * 1024) {
          dispatch('error', 'FILE_SIZE_EXCEEDED');
          return;
        }
      }
      dispatch('upload', newFiles);
      if(multiple) files.push(file);
      else files = [file];
    }
    dispatch('change', files);
  };
</script>

<div
    class={classname}
    on:click={fileClick}
    on:dragenter={handleDrag}
    on:dragleave={handleDrag}
    on:dragover={handleDrag}
    on:drop={drop}
>
  <input
      class={inputclass}
      type="file"
      bind:this={filePlatform}
      {id}
      {accept}
      {multiple}
      on:change={inputChange}
  >
  <slot />
</div>
