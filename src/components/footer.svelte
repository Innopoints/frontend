<script>
  import { Button, Card } from 'attractions';

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer>
  <div class="to-top">
    <Button filled on:click={scrollToTop}>
      <svg src="static/images/icons/arrow-up.svg" class="mr" />
      back to top
    </Button>
  </div>
  <div class="container space-between">
    <div class="left space-between">
      <div>
        <a href="/" class="title-container">
          <svg src="static/images/innou-icon-white.svg" class="logo" />
          <span class="title">Innopoints</span>
        </a>

        <div class="socials space-between">
          <a href="https://vk.com/innopolisu">
            <img loading="lazy" src="/images/footer/vk.svg" alt="" />
          </a>
          <a href="https://twitter.com/@InnopolisU">
            <img loading="lazy" src="/images/footer/twitter.svg" alt="" />
          </a>
          <a href="https://www.youtube.com/user/InnopolisU">
            <img loading="lazy" src="/images/footer/youtube.svg" alt="" />
          </a>
        </div>
      </div>
      <span class="credits white">
        with credits to
        <br />
        <a href="https://isometriclove.com">Isometriclove</a>
        and
        <a href="https://humaaans.com">Humaaans</a>
      </span>
    </div>
    <div class="right">
      <img loading="lazy" src="/images/footer/pointer.svg" class="pointer" alt="" />
      <Card>
        <p>
          If you encounter any issues with the website, please, report them to
          <a href="https://t.me/andrejsblakunovs">@andrejsblakunovs</a>.
        </p>
      </Card>
    </div>
  </div>
</footer>

<style src="../../static/css/components/footer.scss"></style>
