<script>
  import Carousel from '@beyonk/svelte-carousel';
  import getBackground from 'src/utils/optimal-color.js';
  import { range } from 'attraction/utils';

  export let images;
  export let selectedColor;

  if (images.length === 0) {
    images.push({ url: '/images/create-product/placeholder.svg' });
  }

  let displayedIdx = 0;
  let carousel = null;

  $: slideToChosenColor(selectedColor);

  function slideToChosenColor(color) {
    if (carousel == null || images[displayedIdx].color === color) {
      return;
    }

    for (let i = 0; i < color.length; ++i) {
      if (images[i].color === color) {
        carousel.go(i);
        displayedIdx = i;
        return;
      }
    }
  }

  function registerSlideChange({ detail }) {
    displayedIdx = detail.currentSlide;
    if (images[displayedIdx].color != null) {
      selectedColor = images[displayedIdx].color;
    }
  }
</script>

<div class="showcase">
  {#if images.length > 1}
    <div class="previews">
      {#each images as image, index}
        <label>
          <input
            type="radio"
            name="preview-images"
            value={index}
            checked={index === displayedIdx}
            on:change={() => carousel.go(index)}
          />
          <div class="icon">
            <img
              src={image.url}
              style={getBackground(image.color)}
              alt=""
            />
          </div>
        </label>
      {/each}
    </div>
  {/if}

  <div class="photo">
    <Carousel
      perPage={1}
      dots={false}
      controls={false}
      draggable={images.length > 1}
      on:change={registerSlideChange}
      bind:this={carousel}
    >
      {#each images as image}
        <div class="slide-content">
          <img
            src={image.url}
            style={getBackground(image.color)}
            alt=""
          />
        </div>
      {/each}
    </Carousel>
    {#if images.length > 1}
      <div class="dots">
        {#each [...range(images.length)] as idx}
          <div class="dot" class:active={idx === displayedIdx} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style src="../../../../static/css/containers/products/view/image-previews.scss"></style>
