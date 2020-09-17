<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { Button, Card } from 'attractions';
  import getBackground from 'src/utils/optimal-color.js';
  import { API_HOST_BROWSER } from 'src/constants/env.js';

  export let file;
  const color = getContext('variety-color');

  const dispatch = createEventDispatcher();
</script>

<div class="image-tile">
  <Card tight>
    {#if file._id != null}
      <div class="image-wrapper">
        <img
          loading="lazy"
          src="{API_HOST_BROWSER}/file/{file._id}"
          style={getBackground($color)}
          alt={file.name}
        />
      </div>
      <Button danger on:click={() => dispatch('delete', file)}>
        <svg src="static/images/icons/trash-2.svg" class="mr" />
        delete
      </Button>
    {/if}
  </Card>
</div>

<style src="../../../../static/css/components/products/new/image-tile.scss"></style>
