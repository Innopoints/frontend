<script>
  import Layout from '@/layouts/default.svelte';
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';
  import TextField from 'ui/text-field.svelte';
  import Labeled from 'ui/labeled.svelte';
  import Dot from 'ui/dot.svelte';
</script>

<svelte:head>
  <title>UI Showcase – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/ui-kit-page.css" />
</svelte:head>

<Layout>
  <Card id="buttons">
    <h1>Buttons</h1>
    <div class="showcase">
      <Button filled href="#" away>link</Button>
      <Button filled>button</Button>
      <Button outline filled href="#">link</Button>
      <Button href="#">link</Button>
      <Button disabled filled>disabled</Button>
      <Button disabled outline>disabled</Button>
      <Button disabled>disabled</Button>
    </div>
    <div class="showcase">
      <Button filled>
        button
        <img alt="" src="images/ui-kit-page/external-link.svg" class="ml" />
      </Button>
      <Button href="#">
        <img alt="" src="images/ui-kit-page/calendar.svg" class="mr" />
        button
      </Button>
    </div>
    <div class="showcase">
      <Button round badge>
        <img alt="" src="images/ui-kit-page/bell.svg" />
      </Button>
      <Button round normal>
        <img alt="" src="images/ui-kit-page/x.svg" />
      </Button>
      <Button outline round normal>
        <img alt="" src="images/ui-kit-page/x.svg" />
      </Button>
      <Button filled chevron>chevron</Button>
    </div>
    <hr />
    <div class="showcase">
      <Button filled danger>
        <img alt="" src="images/ui-kit-page/external-link.svg" class="mr" />
        button
      </Button>
      <Button href="#" outline danger>button</Button>
      <Button href="#" danger>button</Button>
    </div>
  </Card>

  <Card id="txts">
    <h1>Text Fields</h1>
    <div class="showcase">
      <TextField placeholder="Placeholder" />
    </div>
    <div class="showcase half">
      <TextField placeholder="Price" item right>
        <img alt="" src="images/innopoint-sharp.svg" class="item" />
      </TextField>
      <TextField type="number" item>
        <span class="item">XXL</span>
      </TextField>
    </div>
    <div class="showcase">
      <TextField type="number" />
    </div>
    <div class="showcase">
      <TextField
        type="number"
        multiline
        id="description"
        placeholder="High-quality bulletproof fabric"
        cols="5" />
    </div>

    <hr />

    <div class="showcase">
      <form>
        <div class="form-field">
          <label for="name">
            <span class="name">
              Name
              <span class="required">*</span>
            </span>
            <span class="desc">
              This field is to write the name, so please do.
            </span>
          </label>
          <div class="text-field-wrapper">
            <div class="text-field">
              <input type="text" id="name" />
            </div>
            <span class="required">* Required</span>
          </div>
        </div>

        <div class="form-field">
          <label for="type">
            <span class="name">Type</span>
            <span class="desc">Write the type here, e.g. sweatshirt</span>
          </label>
          <div class="text-field-wrapper">
            <div class="text-field">
              <input type="text" id="type" />
            </div>
          </div>
        </div>

        <div class="form-field">
          <label for="price">
            <span class="name">
              Price
              <span class="required">*</span>
            </span>
          </label>
          <div class="text-field-wrapper">
            <div class="text-field with-item right">
              <input type="number" placeholder="Price" id="price" />
              <img alt="" src="images/innopoint-sharp.svg" class="item" />
            </div>
            <span class="required">* Required</span>
          </div>
        </div>

        <div class="form-field">
          <label for="size">
            <span class="name">
              Size
              <span class="required">*</span>
            </span>
          </label>
          <div class="text-field-wrapper">
            <div class="text-field with-item left">
              <input type="number" id="size" />
              <span class="item">XXL</span>
            </div>
            <span class="required">* Required</span>
          </div>
        </div>
      </form>
    </div>

    <hr />

    <div class="showcase">
      <div class="text-field outline">
        <input type="text" id="nothing" />
        <label class="label" for="nothing">Label</label>
      </div>
      <div class="text-field outline with-item left">
        <input type="text" id="username" pattern="[A-Za-z0-9_]{(5, 32)}" />
        <label class="label" for="username">Telegram</label>
        <img alt="" src="images/ui-kit-page/at-sign.svg" class="item" />
        <span class="error">
          A username should contain from 5 to 32 symbols: a–z, 0–9, _.
        </span>
      </div>
    </div>
  </Card>

  <Card id="radios">
    <h1>Radio Buttons</h1>
    <div class="showcase">
      <div role="group">
        <label class="radio">
          <input type="radio" name="choices" checked="checked" />
          <div class="icon" />
        </label>

        <label class="radio">
          <input type="radio" name="choices" />
          <div class="icon" />
        </label>

        <label class="radio">
          <input type="radio" name="choices" />
          <div class="icon" />
        </label>
      </div>

      <hr />

      <div role="group" id="colored">
        <label class="radio colored" id="red">
          <input type="radio" name="colors" checked="checked" />
          <div class="icon" />
        </label>

        <label class="radio colored" id="green">
          <input type="radio" name="colors" />
          <div class="icon" />
        </label>

        <label class="radio colored" id="blue">
          <input type="radio" name="colors" />
          <div class="icon" />
        </label>

        <label class="radio colored" id="white">
          <input type="radio" name="colors" />
          <div class="icon" />
        </label>
      </div>

      <hr />

      <div role="group" class="with-labels">
        <label class="clickable">
          <div class="radio">
            <input type="radio" checked="checked" name="radio-choices2" />
            <div class="icon" />
          </div>
          some label
        </label>
        <label class="clickable">
          <div class="radio">
            <input type="radio" checked="checked" name="radio-choices2" />
            <div class="icon" />
          </div>
          other label
        </label>
        <label class="clickable">
          <div class="radio">
            <input type="radio" checked="checked" name="radio-choices2" />
            <div class="icon" />
          </div>
          more label
        </label>
      </div>
    </div>
  </Card>

  <Card id="checkboxes">
    <h1>Checkboxes</h1>
    <div class="showcase">
      <div role="group">
        <label>
          <div class="checkbox">
            <input type="checkbox" checked="checked" name="check-choices" />
            <div class="icon" />
          </div>
        </label>
        <label>
          <div class="checkbox">
            <input type="checkbox" checked="checked" name="check-choices" />
            <div class="icon" />
          </div>
        </label>
        <label>
          <div class="checkbox">
            <input type="checkbox" name="check-choices" />
            <div class="icon" />
          </div>
        </label>
      </div>

      <hr />

      <div role="group">
        <label>
          <div class="checkbox round colored" id="red-chk">
            <input type="checkbox" checked="checked" name="check-choices-clr" />
            <div class="icon" />
          </div>
        </label>
        <label>
          <div class="checkbox round colored" id="blue-chk">
            <input type="checkbox" checked="checked" name="check-choices-clr" />
            <div class="icon" />
          </div>
        </label>
        <label>
          <div class="checkbox round colored" id="white-chk">
            <input type="checkbox" name="check-choices-clr" />
            <div class="icon" />
          </div>
        </label>
      </div>

      <hr />

      <div role="group" class="with-labels">
        <label class="clickable">
          <div class="checkbox">
            <input type="checkbox" checked="checked" name="check-choices2" />
            <div class="icon" />
          </div>
          some label
        </label>
        <label class="clickable">
          <div class="checkbox">
            <input type="checkbox" checked="checked" name="check-choices2" />
            <div class="icon" />
          </div>
          other label
        </label>
        <label class="clickable">
          <div class="checkbox">
            <input type="checkbox" checked="checked" name="check-choices2" />
            <div class="icon" />
          </div>
          more label
        </label>
      </div>
    </div>
  </Card>

  <Card id="switches">
    <h1>Switches</h1>
    <div class="showcase">
      <label class="switch-wrapper">
        <input type="checkbox" class="switch-ctl" />
        <div class="switch">
          <div class="knob" />
        </div>
      </label>
      <label>
        <input type="checkbox" checked="checked" class="switch-ctl" />
        <div class="switch">
          <div class="knob" />
        </div>
      </label>
    </div>

    <hr />

    <div class="showcase">
      <label class="clickable switch-wrapper" id="with-prefix">
        Prefixing text
        <input type="checkbox" checked="checked" class="switch-ctl" />
        <div class="switch">
          <div class="knob" />
        </div>
      </label>
    </div>

    <hr />

    <div class="showcase">
      <label class="clickable switch-wrapper">
        <input type="checkbox" checked="checked" class="switch-ctl first" />
        <span class="state first">First</span>
        <div class="switch two-state">
          <div class="knob" />
        </div>
        <span class="state second">Second</span>
      </label>
    </div>
  </Card>

  <Card id="labeled-elements">
    <h1>Labeled Elements</h1>
    <div class="showcase">
      <Labeled label="Label">
        <span style="font-size: 1.4rem">1000 innopoints</span>
      </Labeled>
      <Labeled icon label="Label">
        <img
          alt=""
          src="images/ui-kit-page/award.svg"
          class="icon"
          slot="icon" />
        <span style="font-size: 1.4rem">1000 innopoints</span>
      </Labeled>
    </div>
  </Card>

  <Card id="dropdowns">
    <h1>Dropdowns</h1>
    <div class="showcase vertical">
      <div class="dropdown-shell">
        <button class="btn handle">
          open dropdown
          <img
            alt=""
            src="images/ui-kit-page/chevron-down.svg"
            class="chevron" />
        </button>
        <div class="dropdown">
          <div class="relative-wrapper" style="padding: 1em; width: 15em;">
            <button class="btn normal round close">
              <img alt="" src="images/ui-kit-page/x.svg" />
            </button>
            great now close me
            <br />
            great now close me
            <br />
            great now close me
            <br />
            great now close me
          </div>
        </div>
      </div>
      <div class="dropdown-shell">
        <button class="btn handle">
          right dropdown
          <img
            alt=""
            src="images/ui-kit-page/chevron-down.svg"
            class="chevron" />
        </button>
        <div class="dropdown right-edge">
          <button class="btn filled">woo alRIGHT</button>
        </div>
      </div>
    </div>
  </Card>

  <Card id="accordions">
    <h1>Accordions</h1>
    <div class="showcase">
      <ul class="accordion">
        <li>Not expandable</li>
        <li class="panel">
          <button class="btn handle">
            expandable
            <img
              alt=""
              src="images/ui-kit-page/chevron-down.svg"
              class="ml chevron" />
          </button>
        </li>
        <section>
          Here's some hidden away content
          <br />
          for your great pleasure.
          <button class="btn filled">does nothing</button>
        </section>
        <li class="panel">
          <button class="btn handle">
            also expandable
            <img
              alt=""
              src="images/ui-kit-page/chevron-down.svg"
              class="ml chevron" />
          </button>
        </li>
        <section>
          Here's some hidden away content
          <br />
          for your great pleasure.
          <button class="btn filled">does nothing</button>
        </section>
      </ul>
    </div>
  </Card>

  <Card id="dots">
    <h1>Dots</h1>
    <div class="showcase vertical">
      <p class="row">
        New information dot
        <Dot />
      </p>
      <p class="row" style="font-size: .8rem;">
        Smaller text - smaller dot
        <Dot />
      </p>
      <p class="row">
        Artificially smaller dot
        <Dot small />
      </p>
      <p class="row">
        Attention dot
        <Dot attention />
      </p>
      <p class="row">
        Active dot
        <Dot active />
      </p>
    </div>
  </Card>

  <Card id="chips">
    <h1>Chips</h1>
    <div class="showcase">
      <div style="display: flex; flex-wrap: wrap;">
        <div class="chip unclickable">most first</div>
        <div class="chip unclickable">least first</div>
        <div class="chip unclickable outline">least last</div>
        <div class="chip unclickable outline">most last</div>
      </div>
    </div>

    <hr />

    <div class="showcase">
      <div role="group" style="display: flex; flex-wrap: wrap;">
        <label class="chip-wrapper">
          <input type="radio" name="things" />
          <div class="chip">most first</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="things" checked />
          <div class="chip">least first</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="things" />
          <div class="chip">least last</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="things" />
          <div class="chip">most last</div>
        </label>
      </div>
    </div>

    <hr />

    <div class="showcase">
      <div role="group" style="display: flex; flex-wrap: wrap;">
        <label class="chip-wrapper">
          <input type="radio" name="thhings" disabled />
          <div class="chip small">XS</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thhings" checked />
          <div class="chip small">S</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thhings" />
          <div class="chip small">M</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thhings" />
          <div class="chip small">XXL</div>
        </label>
      </div>
    </div>

    <hr />

    <div class="showcase">
      <div role="group" style="display: flex; flex-wrap: wrap;">
        <label class="chip-wrapper">
          <input type="radio" name="thingss" />
          <div class="chip outline">XS</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thingss" checked />
          <div class="chip outline">S</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thingss" />
          <div class="chip outline">M</div>
        </label>
        <label class="chip-wrapper">
          <input type="radio" name="thingss" />
          <div class="chip outline">XXL</div>
        </label>
      </div>
    </div>

    <hr />

    <div class="showcase">
      <div role="group" style="display: flex; flex-wrap: wrap;">
        <label class="chip-wrapper">
          <input type="checkbox" name="stuff" checked />
          <div class="chip">most first</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stuff" checked />
          <div class="chip">least first</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stuff" />
          <div class="chip">least last</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stuff" />
          <div class="chip">most last</div>
        </label>
      </div>
    </div>

    <hr />

    <div class="showcase">
      <div role="group" style="display: flex; flex-wrap: wrap;">
        <label class="chip-wrapper">
          <input type="checkbox" name="stufff" checked />
          <div class="chip outline">XS</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stufff" checked />
          <div class="chip outline">S</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stufff" />
          <div class="chip outline">M</div>
        </label>
        <label class="chip-wrapper">
          <input type="checkbox" name="stufff" />
          <div class="chip outline">XXL</div>
        </label>
      </div>
    </div>
  </Card>

  <Card id="dialogs">
    <h1>Dialogs</h1>
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
    <h1>Image Carousel</h1>
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

  <Card id="choice-btns">
    <h1>Choice buttons</h1>
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
    <h1>Tabs</h1>
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

  <Card id="popovers">
    <h2>Popovers</h2>
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
</Layout>

<!-- <script>
  // Open/close dropdowns
  document.querySelectorAll('.dropdown-shell > .handle').forEach(el => {
    el.addEventListener('click', function() {
      document.querySelectorAll('.dropdown-shell').forEach(el => {
        if (el !== this.parentElement) {
          el.classList.remove('open');
        }
      });
      this.parentElement.classList.toggle('open');
    });
  });
  document.querySelectorAll('.dropdown-shell .close').forEach(el => {
    el.addEventListener('click', function() {
      this.closest('.dropdown-shell').classList.remove('open');
    });
  });
  // Accordions
  document.querySelectorAll('.accordion > .panel > .handle').forEach(el => {
    el.addEventListener('click', function() {
      this.parentElement.parentElement.querySelectorAll('.panel').forEach(el => {
        if (el !== this.parentElement) {
          el.classList.remove('open');
        }
      });
      this.parentElement.classList.toggle('open');
    });
  });
</script> -->
