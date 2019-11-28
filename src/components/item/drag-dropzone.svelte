<script>
  import Dropzone from 'ui/dropzone.svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';

  export let index;

  $: files = [];
  $: images = [];

  const openFiles = async (arr) => {
    let urls = [];
    for (let i = 0; i < arr.length; i++) urls.push(await readFileAsync(arr[i]));
    return urls;
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const changeFiles = async e => {
    files = e.detail;
    images = await openFiles(e.detail);
  };

  const removeImage = (data) => {
    let index = images.indexOf(data);
    if (index > -1) {
      images = images.filter((x, i) => i !== index);
      files = files.filter((x, i) => i !== index);
    }
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
   on:change={changeFiles}
   classname="image-platform{images.length ? ' has-content' : ''}"
   id="file-input{index}"
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

