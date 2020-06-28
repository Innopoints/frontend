<script>
  import { Button, H1, H2 } from 'attractions';

  const cardWidth = 212;
  const cardHeight = 137;
</script>

<div class="material padded">
  <div class="text">
    <H1>Nothing here</H1>
    <p class="subtitle">That rabbit must have given you the wrong lead.</p>
    <Button href="/" filled>
      <svg src="images/icons/home.svg" class="icon mr" />
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
      alt="Go to a product page"
    />
  </a>
  <a href="/" class="destination">
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
