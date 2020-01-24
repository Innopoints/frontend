<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import SimplebarList from 'ui/simplebar-list.svelte';
  import Swiper from 'swiper';
  import 'swiper/css/swiper.min.css';
  import getBackground from '@/utils/optimal-color.js';
  import { API_HOST } from '@/constants/env.js';

  export let productControl;
  export let selectedColor;

  const dispatch = createEventDispatcher();

  let swiper;
  onMount(() => {
    if (productControl.flatImages.length > 1) {
      swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        cssMode: true,
        pagination: {
          el: '.swiper-container > .swiper-pagination',
        },
        scrollbar: {
          el: null,
        },
        on: {
          slideChange() {
            selectedColor = productControl.flatImages[this.realIndex].color;
            dispatch('color-change', selectedColor);
          },
        },
      });
    }
  });

  $: swiper != null && showImageForColor(selectedColor);

  function showImageForColor(color) {
    if (selectedColor !== color) {
      selectedColor = color;
      dispatch('color-change', selectedColor);
    }
    for (let i = 0; i < productControl.flatImages.length; ++i) {
      if (productControl.flatImages[i].color === color) {
        swiper.slideTo(i);
        break;
      }
    }
  }
</script>

<div class="showcase" class:no-previews={productControl.flatImages.length <= 1}>
  {#if productControl.flatImages.length > 1}
    <SimplebarList classname="previews">
      {#each productControl.flatImages as image}
        <label>
          <input
            type="radio"
            name="preview-images"
            value={image.color}
            checked={
              image.color == selectedColor
              && image.url == productControl.coverImage(image.color)
            }
            on:change={(evt) => showImageForColor(evt.target.value)}
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
            src={API_HOST + image.url}
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
