<script>
  import { onMount } from 'svelte';
  import { Button, H1, H2 } from 'attractions';
  import * as api from 'src/utils/api.js';

  const cardWidth = 212;
  const cardHeight = 137;

  let randomURL = '/';
  onMount(async function fetchRandomURL() {
    try {
      randomURL = (await api.json(api.get('/random_page'))).url;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<div class="material padded">
  <div class="text">
    <H1>Nothing here</H1>
    <p class="subtitle">That rabbit must have given you the wrong lead.</p>
    <Button href="/" filled>
      <svg src="static/images/icons/home.svg" class="icon mr" />
      take me home
    </Button>
  </div>
  <img src="/images/404/web-traveller.svg" width="240" height="387" class="picture" alt="">
  <H2>Feeling lucky?</H2>
  <a href="/profile" class="destination">
    <img
      src="/images/404/profile.svg"
      width={cardWidth}
      height={cardHeight}
      class="repr"
      alt="Go to the profile"
    />
  </a>
  <a href="/projects" class="destination">
    <img
      src="/images/404/browser.svg"
      width={cardWidth}
      height={cardHeight}
      class="repr"
      alt="Go to the projects"
    />
  </a>
  <a href="/products" class="destination">
    <img
      src="/images/404/browser.svg"
      width={cardWidth}
      height={cardHeight}
      class="repr"
      alt="Go to the store"
    />
  </a>
  <a href={randomURL} class="destination">
    <img
      src="/images/404/random.svg"
      width={cardWidth}
      height={cardHeight}
      class="repr"
      alt="Go somewhere random"
    />
  </a>
</div>

<style src="../../../static/css/containers/errors/error-404.scss"></style>
