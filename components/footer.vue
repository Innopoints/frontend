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
            <Logo class="logo" />
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
        <img src="/images/footer/pointer.svg" class="pointer" />
        <nav>
          <div class="search shadow-1">
            search
            <Search />
          </div>
          <ul>
            <li>
              <nuxt-link to="/projects" class="white">browse the projects</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/store" class="white">see the InnoStore</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
  import Button from './ui/button';
  import Logo from '../static/images/innou-icon.svg';
  import Search from '../static/images/icons/search.svg';

  export default {
    name: "Footer",
    components: {
      Button,
      Logo,
      Search,
    },
    methods: {
      scrollToTop: () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
    },
  };
</script>
