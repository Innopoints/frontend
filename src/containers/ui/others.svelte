<script>
  import Card from 'ui/card.svelte';
</script>

<Card id="typo">
  <h1>Typography</h1>
  <div class="showcase vertical">
    <span class="headline">Headline</span>
    <span class="subhead">
        Sub-headline text. Fly high, fly low, you know.
        <br />
        Look to the sky, up to the stars.
      </span>

    <hr />

    <h1>h1 Heading</h1>
    <h2>h2 Heading</h2>
    <h3>h3 Heading</h3>

    <hr />
    Regular text
    <strong>Bold text</strong>
    <span class="label">Label</span>
    <span class="label small">Small Label</span>
    <a href="/nowhere">Link</a>
    <a href="/ui">Visited</a>
  </div>
</Card>

<Card id="carousels">
  <h1>Image Carousel</h1>
  <div class="showcase">
    <div class="carousel">
      <div class="curr-slide">
        <img alt="" src="/images/store/sweatshirt.png" />
      </div>
      <div class="slides">
        <label class="slide">
          <input type="radio" name="photos" checked />
          <div class="icon" />
        </label>
        <label class="slide">
          <input type="radio" name="photos" />
          <div class="icon" />
        </label>
        <label class="slide">
          <input type="radio" name="photos" />
          <div class="icon" />
        </label>
        <label class="slide">
          <input type="radio" name="photos" />
          <div class="icon" />
        </label>
      </div>
      <button class="btn round prev-slide">
        <img alt="" src="/images/icons/chevron-left.svg" />
      </button>
      <button class="btn round next-slide">
        <img alt="" src="/images/icons/chevron-right.svg" />
      </button>
    </div>
  </div>
</Card>

<Card id="cards">
  <h1>Cards</h1>
  <div class="showcase vertical">
    <Card>This is a small card, nothing special.</Card>
    <Card classname="with-image">
      <img src="/images/store/sweatshirt.png" class="image" alt="sweatshirt" />
      <div class="content">
        <div class="title">Write clean code</div>
        <div class="subtitle">subtitle</div>
      </div>
    </Card>
  </div>
</Card>

<Card id="dividers">
  <h1>Dividers</h1>
  <div class="showcase">
    Regular divider
    <hr />
    Divider with text
    <hr data-text="some text" />
  </div>
</Card>
