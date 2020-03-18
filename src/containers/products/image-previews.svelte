<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import SimplebarList from 'ui/simplebar-list.svelte';
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css';
  import getBackground from '@/utils/optimal-color.js';
  import { API_HOST } from '@/constants/env.js';

  export let productControl;
  export let selectedColor;

  if(productControl.flatImages.length === 0) {
    productControl.flatImages.push({
      url: '/images/create-product/placeholder.svg',
      placeholder: true,
    });
  }
  let displayedImage = productControl.flatImages[0];

  const dispatch = createEventDispatcher();

  let swiper;
  onMount(() => {
    if (productControl.flatImages.length > 1) {
      swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        pagination: {
          el: '.swiper-container > .swiper-pagination',
        },
        scrollbar: {
          el: null,
        },
        grabCursor: true,
        on: {
          transitionEnd() {
            displayedImage = productControl.flatImages[this.realIndex];
            selectedColor = displayedImage.color;
            dispatch('color-change', selectedColor);
          },
        },
      });
    }
  });

  function showImage(imageIndex) {
    const newImage = productControl.flatImages[imageIndex];
    if (displayedImage == null || displayedImage.color !== newImage.color) {
      dispatch('color-change', newImage.color);
    }
    swiper.slideTo(imageIndex, 300, false);
    displayedImage = newImage;
    selectedColor = newImage.color;
  }

  $: {
    if (selectedColor !== displayedImage.color) {
      const coverIndex = productControl.flatImages.findIndex(img => img.color === selectedColor);
      swiper.slideTo(coverIndex, 300, false);
      displayedImage = productControl.flatImages[coverIndex];
    }
  }
</script>

<div class="showcase" class:no-previews={productControl.flatImages.length <= 1}>
  {#if productControl.flatImages.length > 1}
    <SimplebarList classname="previews">
      {#each productControl.flatImages as image, i}
        <label>
          <input
            type="radio"
            name="preview-images"
            value={i}
            checked={image === displayedImage}
            on:change={(evt) => showImage(evt.target.value)}
          />
          <div class="icon">
            <img
              src={API_HOST + image.url}
              style="background: {getBackground(image.color)}"
              alt=""
            />
          </div>
        </label>
      {/each}
    </SimplebarList>
  {/if}

  <div class="swiper-container">
    <div class="swiper-wrapper">
      {#each productControl.flatImages as image}
        <div class="swiper-slide">
          <img
            src={(image.placeholder ? '' : API_HOST) + image.url}
            style="background: {getBackground(image.color)}"
            alt=""
          />
        </div>
      {/each}
    </div>

    {#if productControl.flatImages.length > 1}
      <div class="swiper-pagination" />
    {/if}
  </div>
</div>
