<script>
  import {onMount} from 'svelte';
  import 'simplebar/dist/simplebar.css';
  import SimpleBar from 'simplebar';
  import Swiper from 'swiper';
  import getBackground from '@/utils/optimal-color';

  export let variety;
  $: activeImg = variety.images[0];

  let previews = null;
  let simpleBar, swiper;
  const scrollThreshold = 3;
  onMount(() => {
    simpleBar = new SimpleBar(previews);
    document.querySelector('.simplebar-offset').classList.add('at-top');
    simpleBar.getScrollElement().addEventListener('scroll', function() {
      const scrollContainer = document.querySelector('.simplebar-offset');
      if (this.scrollTop < scrollThreshold) {
        scrollContainer.classList.add('at-top');
      } else if (this.scrollHeight - this.offsetHeight - this.scrollTop < scrollThreshold) {
        scrollContainer.classList.add('at-bottom');
      } else {
        scrollContainer.classList.remove('at-top');
        scrollContainer.classList.remove('at-bottom');
      }
    });

    swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-container > .swiper-pagination',
      },
      on: {
        transitionEnd() {
          let el = document.querySelector('.swiper-slide.swiper-slide-active img');
          if (el) activeImg = el.getAttribute('data-img');
        },
      },
    });
  });

  const changeActive = img => {
    activeImg = img;
    if (swiper) swiper.slideToLoop(variety.images.indexOf(img), 200);
  };
</script>

<div class="showcase" class:no-previews={variety.images.length <= 1}>
  <div role="group" class="previews" bind:this={previews}>
    {#each variety.images as img (img)}
      <label>
        <input on:change={() => changeActive(img)} type="radio" name="preview-images" checked={img === activeImg} />
        <div class="icon">
          <img src={img} style="{'background: ' + getBackground(variety.color)}" alt="" />
        </div>
      </label>
    {/each}
  </div>

  <div class="swiper-container">
    <div class="swiper-wrapper">
      {#each variety.images as img (img)}
        <div class="swiper-slide">
          <img src={img} data-img={img} style="{'background: ' + getBackground(variety.color)}" alt="" />
        </div>
      {/each}
    </div>
    <div class="swiper-button-prev" on:click={() => swiper.slidePrev(200)}></div>
    <div class="swiper-button-next" on:click={() => swiper.slideNext(200)}></div>
    <div class="swiper-pagination"></div>
  </div>
</div>
