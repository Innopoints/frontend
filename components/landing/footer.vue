<template>
  <footer>
    <div class="container space-between">
      <div class="left space-between">
        <div>
          <div class="title-container">
            <img src="/images/landing/innou-logo.png" class="logo" />
            <span class="title">Innopoints</span>
          </div>
          <div class="socials space-between">
            <a class="social" href="#"><img src="/images/landing/vk.svg" /></a>
            <a class="social" href="#"><img src="/images/landing/facebook.svg" /></a>
            <a class="social" href="#"><img src="/images/landing/twitter.svg" /></a>
            <a class="social" href="#"><img src="/images/landing/instagram.svg" /></a>
            <a class="social" href="#"><img src="/images/landing/youtube.svg" /></a>
          </div>
        </div>
        <span class="credits white">
          with credits to <br/>
          <a class="credit-link white" href="https://www.isometriclove.com/" target="_blank">Isometriclove</a>
          and <a class="credit-link white" href="https://www.humaaans.com/" target="_blank">Humaaans</a>
        </span>
      </div>

      <div class="right">
        <img src="/images/landing/pointer.png" />
        <nav>
          <div class="card search space-between shadow-2">
            search
            <img src="/images/landing/search.svg" />
          </div>
          <ul>
            <li>
              <nuxt-link to="/" class="white">browse the events</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="white">see the InnoStore</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "LandingFooter"
  };
</script>
