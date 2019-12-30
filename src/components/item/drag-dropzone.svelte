<script>
  import Dropzone from 'ui/dropzone.svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import {changeVarietyField, saveDraft} from '@/store/item';
  import openFiles from '@/utils/read-files';

  export let index;
  export let files;

  let images = [];
  $: (async() => images = await openFiles(files))();

  const changeFiles = async e => {
    changeVarietyField(index, 'images', e.detail);
    saveDraft();
  };
  const removeImage = (data) => {
    let pos = images.indexOf(data);
    if (pos === -1) return;
    changeVarietyField(index, 'images', files.filter((x, i) => i !== pos));
    saveDraft();
  };
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

<Dropzone
   value={files}
   id="file-input{index}"
   classname="image-platform{images.length ? ' has-content' : ''}"
   disabledQuerySelector=".card.image"
   on:change={changeFiles}
>
  {#if images.length}
    <div class="images">
      {#each Object.values(images) as img, i (i)}
        <Card
            classname="card image"
            img={img}
            imgWrap={false}
            imgclass=" "
            contentclass="actions"
            on:click={(e) => e.detail.stopPropagation()}
        >
          <Button on:click={() => removeImage(img)} isDanger isRound>
            <svg class="icon" src="/images/icons/x.svg" />
          </Button>
          <Button isNormal isRound>
            <svg class="icon" src="/images/icons/move.svg" />
          </Button>
        </Card>
      {/each}
    </div>
    <svg src="/images/icons/image.svg" class="icon mr" />
  {:else}
    <svg src="/images/icons/image.svg" class="icon mr" />
    <label class="title" for="file-input2">drag &amp; drop here or click to upload photos</label>
    <small>Make sure the ratio is 1:1 (square)</small>
  {/if}
</Dropzone>

