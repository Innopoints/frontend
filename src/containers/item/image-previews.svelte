<script>
  import {onMount} from 'svelte';
  import 'simplebar/dist/simplebar.css';
  import SimpleBar from 'simplebar';
  import Swiper from 'swiper';

  let previews = null;
  let simpleBar;
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

    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-container > .swiper-pagination',
      },
    });
  });
</script>

<div class="showcase">
  <div role="group" class="previews" bind:this={previews}>
    <label>
      <input type="radio" name="preview-images" checked="checked" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #fff0f0" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0f0ff" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
    </label>
    <label>
      <input type="radio" name="preview-images" />
      <div class="icon">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
    </label>
  </div>

  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="images/store/sweatshirt.png" style="background: #fff0f0" alt="" />
      </div>
      <div class="swiper-slide">
        <img src="images/store/sweatshirt.png" style="background: #f0fff0" alt="" />
      </div>
      <div class="swiper-slide">
        <img src="images/store/sweatshirt.png" style="background: #f0f0ff" alt="" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>
