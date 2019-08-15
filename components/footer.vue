<template>
  <footer>
    <div class="to-top">
      <Button
        @click="scrollToTop"
        img="/images/icons/arrow-up.svg"
        label="back to top"
        filled
      />
    </div>
    <div class="container space-between">
      <div class="left space-between">
        <div>
          <nuxt-link to="/" class="title-container">
            <!--TODO: change this too-->
            <img src="/images/icons/innou-icon.svg" class="logo" />
            <span class="title">Innopoints</span>
          </nuxt-link>
          <div class="socials space-between">
            <a href="https://vk.com/innopolisu" target="_blank">
              <img src="/images/footer/vk.svg" />
            </a>
            <a href="https://www.facebook.com/InnopolisU" target="_blank">
              <img src="/images/footer/facebook.svg" />
            </a>
            <a href="https://twitter.com/@InnopolisU" target="_blank">
              <img src="/images/footer/twitter.svg" />
            </a>
            <a href="https://www.instagram.com/innopolisu/" target="_blank">
              <img src="/images/footer/instagram.svg" />
            </a>
            <a href="https://www.youtube.com/user/InnopolisU" target="_blank">
              <img src="/images/footer/youtube.svg" />
            </a>
          </div>
        </div>
        <span class="credits white">
          with credits to <br />
          <a href="https://isometriclove.com" target="_blank">Isometriclove</a>
          and <a href="https://humaaans.com" target="_blank">Humaaans</a>
        </span>
      </div>

      <div class="right">
        <img src="/images/footer/pointer.png" class="pointer" />
        <nav>
          <div class="search shadow-1">
            search
            <!--TODO: change to icon-->
            <img src="/images/icons/search.svg" />
          </div>
          <ul>
            <li>
              <nuxt-link to="/events" class="white">browse the events</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/shop" class="white">see the InnoStore</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
  import Button from './ui/button';

  export default {
    name: "Footer",
    components: { Button },
    methods: {
      scrollToTop: () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
    },
  };
</script>
