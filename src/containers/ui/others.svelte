<script>
  import Card from 'ui/card.svelte';
</script>

<Card id="dialogs">
  <h1 class="todo">Dialogs</h1>
  <div class="showcase vertical">
    <div class="dialog">
      <button class="btn normal round close">
        <img alt="" src="images/ui-kit-page/x.svg" />
      </button>
      <span class="title">
          <img alt="" src="images/ui-kit-page/award.svg" class="icon" />
          U Got Mail
        </span>
      <p>Text of the dialog here text text.</p>
      <div class="actions">
        <button class="btn">cancel</button>
        <button class="btn filled">action</button>
      </div>
    </div>

    <div class="dialog danger">
        <span class="title">
          <img
              alt=""
              src="images/ui-kit-page/alert-triangle.svg"
              class="icon" />
          Warning
        </span>
      <p>Something bad is about to happen. You just gonna let it roll?</p>
      <div class="actions">
        <button class="btn">no, wait</button>
        <button class="btn filled danger">yeah lmao</button>
      </div>
    </div>

    <div class="dialog notice">
      <div class="message">
        <img
            alt=""
            src="images/ui-kit-page/alert-triangle-green.svg"
            class="icon" />
        <p>What's it gonna take for you to ever let go?</p>
      </div>
      <div class="actions">
        <button class="btn">wait, what</button>
      </div>
    </div>
  </div>
</Card>

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
        <img alt="" src="images/ui-kit-page/sweatshirt.png" />
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
        <img alt="" src="images/ui-kit-page/chevron-left-white.svg" />
      </button>
      <button class="btn round next-slide">
        <img alt="" src="images/ui-kit-page/chevron-right-white.svg" />
      </button>
    </div>
  </div>
</Card>

<Card id="cards">
  <h1>Cards</h1>
  <div class="showcase vertical">
    <Card>This is a small card, nothing special.</Card>
    <Card img="images/ui-kit-page/sweatshirt.png">
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
        <img alt="" src="images/ui-kit-page/at-sign.svg" class="icon" />
        Title
      </div>
    </label>
    <label class="choice-btn">
      <input type="radio" name="large-choices" />
      <div class="repr">
        <img alt="" src="images/ui-kit-page/at-sign.svg" class="icon" />
        Title 2
      </div>
    </label>
    <label class="choice-btn">
      <input type="radio" name="large-choices" />
      <div class="repr">
        <img alt="" src="images/ui-kit-page/at-sign.svg" class="icon" />
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
