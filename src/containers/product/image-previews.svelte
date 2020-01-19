<script>
  import {onMount} from 'svelte';
  import 'simplebar/dist/simplebar.css';
  import SimpleBar from 'simplebar';
  import Swiper from 'swiper';
  import getBackground from '@/utils/optimal-color';

  export let variety;
  export let varieties;
  $: images = varieties.map(x => ({images: x.images, color: x.color}));
  $: activeIndex = getArrayOffset(variety);

  const getArrayOffset = variety => {
    let offset = 0;
    for (let x of varieties) {
      if (x.id === variety.id) break;
      else offset += x.images.length;
    }
    if (swiper) swiper.slideToLoop(offset, 200);
    return offset;
  };

  let previews = null;
  let simpleBar, swiper;
  const scrollThreshold = 3;
  onMount(() => {
    if (images.length > 1) {
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
            if (el) activeIndex = parseInt(el.getAttribute('data-index'));
          },
        },
      });
    }
  });

  const changeActive = (index) => {
    if (swiper) swiper.slideToLoop(index, 200);
  };
</script>

<div class="showcase" class:no-previews={images.length <= 1}>
  {#if images.length > 1}
    <div role="group" class="previews" bind:this={previews}>
      {#each images as variet, i (i)}
        {#each variet.images as img, j (img)}
          <label data-index="{i} {j}">
            <input on:change={() => changeActive(2*i + j)} type="radio" name="preview-images" checked={(2*i + j) === activeIndex} />
            <div class="icon">
              <img src={img} style="{'background: ' + getBackground(variet.color)}" alt="" />
            </div>
          </label>
        {/each}
      {/each}
    </div>
  {/if}

  <div class="swiper-container">
    <div class="swiper-wrapper">
      {#each variety.images as img (img)}
        {#each images as variet, i (i)}
          {#each variet.images as img, j (img)}
            <div class="swiper-slide">
              <img src={img} data-index={2*i + j} style="{'background: ' + getBackground(variet.color)}" alt="" />
            </div>
          {/each}
        {/each}
      {/each}
    </div>
    {#if images.length > 1}
      <div class="swiper-pagination"></div>
    {/if}
  </div>
</div>
