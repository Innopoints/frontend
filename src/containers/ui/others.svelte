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
    <a href="nowhere">Link</a>
    <a href="##">Visited</a>
  </div>
</Card>

<Card id="carousels">
  <h1 class="todo">Image Carousel</h1>
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
    <Card img="/images/store/sweatshirt.png">
      <div class="title">Write clean code</div>
      <div class="subtitle">subtitle</div>
    </Card>
  </div>
</Card>

<!--todo: choice button-->
<Card id="choice-btns">
  <h1 class="todo">Choice buttons</h1>
  <div class="showcase">
    <label class="choice-btn">
      <input type="radio" name="large-choices" />
      <div class="repr">
        <img alt="" src="/images/icons/at-sign.svg" class="icon" />
        Title
      </div>
    </label>
    <label class="choice-btn">
      <input type="radio" name="large-choices" />
      <div class="repr">
        <img alt="" src="/images/icons/at-sign.svg" class="icon" />
        Title 2
      </div>
    </label>
    <label class="choice-btn">
      <input type="radio" name="large-choices" />
      <div class="repr">
        <img alt="" src="/images/icons/at-sign.svg" class="icon" />
        Title 3
      </div>
    </label>
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

<Card id="tabs">
  <h1 class="todo">Tabs</h1>
  <div class="showcase">
    <nav class="tabs">
      <label class="tab">
        <input type="radio" name="tabs" />
        <div class="icon">Tab 1</div>
      </label>
      <label class="tab">
        <input type="radio" name="tabs" />
        <div class="icon">Tab 2</div>
      </label>
    </nav>
  </div>
</Card>

<!--todo: popover-->
<Card id="popovers">
  <h2 class="todo">Popovers</h2>
  <div class="showcase">
    <div class="popover-container">
      <a href="##">simple link</a>
      <button class="popover btn shadow-1" type="button">
        <!-- copy -->
        <svg
            class="icon mr feather feather-copy"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        copy
      </button>
    </div>
  </div>
</Card>
