<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>

<footer>
  <div class="to-top">
    <Button isFilled on:click={scrollToTop}>
      <svg src="images/icons/arrow-up.svg" class="mr" />
      back to top
    </Button>
  </div>
  <div class="container space-between">
    <div class="left space-between">
      <div>
        <a href="/" class="title-container">
          <svg src="images/innou-icon-white.svg" class="logo" />
          <span class="title">Innopoints</span>
        </a>

        <div class="socials space-between">
          <a href="https://vk.com/innopolisu">
            <img src="images/footer/vk.svg" alt="" />
          </a>
          <a href="https://www.facebook.com/InnopolisU">
            <img src="images/footer/facebook.svg" alt="" />
          </a>
          <a href="https://twitter.com/@InnopolisU">
            <img src="images/footer/twitter.svg" alt="" />
          </a>
          <a href="https://www.instagram.com/innopolisu/">
            <img src="images/footer/instagram.svg" alt="" />
          </a>
          <a href="https://www.youtube.com/user/InnopolisU">
            <img src="images/footer/youtube.svg" alt="" />
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
      <img src="images/footer/pointer.svg" class="pointer" alt="" />
      <Card>
        <p>The new Innopoints website is finally here! Exciting.</p>
        <p>
          If you encounter any technical issues with the website, please, report them to
          <a href="mailto:innopoints@innopolis.university">innopoints@innopolis.university</a>.
        </p>
      </Card>
    </div>
  </div>
</footer>
