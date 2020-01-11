<script>
  import Dropzone from 'ui/dropzone.svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import Sortable from 'sortablejs';
  import {changeVarietyField, saveDraft, uploadFiles} from '@/store/item';
  import swapIndexes from '@/utils/swap-indexes';
  import {API_HOST} from '@/constants/env';

  export let index;
  export let images;

  let isLoading = false;
  const upload = async e => {
    if (isLoading) return;

    isLoading = true;
    const imgs = await uploadFiles(e.detail);
    await changeVarietyField(index, 'images', images.concat(imgs));
    isLoading = false;
    saveDraft();
  };
  const removeImage = (data) => {
    let pos = images.indexOf(data);
    if (pos === -1) return;
    changeVarietyField(index, 'images', images.filter((x, i) => i !== pos));
    saveDraft();
  };
  const swapImages = (oldIndex, newIndex) => {
    changeVarietyField(index, 'images', swapIndexes(images, oldIndex, newIndex));
    saveDraft();
  };

  let dropzone = null;
  const mountSortable = () => {
    new Sortable(dropzone, {
      handle: '.btn.move',
      draggable: '.card.image',
      animations: 150,
      onEnd: function (e) {
        swapImages(e.oldDraggableIndex, e.newDraggableIndex);
      },
    });
  };
  $: { if (dropzone) mountSortable(); }
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
   id="file-input{index}"
   classname="image-platform{images.length ? ' has-content' : ''}"
   disabledQuerySelector=".card.image"
   on:upload={upload}
>
  {#if images.length}
    <div class="images" bind:this={dropzone}>
      {#each images as img, i (i + img.url)}
        <Card
          classname="card image"
          img={API_HOST + img.url}
          imgWrap={false}
          imgclass=" "
          contentclass="actions"
          on:click={(e) => e.detail.stopPropagation()}
        >
          <Button on:click={() => removeImage(img)} isDanger isRound>
            <svg class="icon" src="/images/icons/x.svg" />
          </Button>
          <Button isNormal isRound classname="btn move">
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

