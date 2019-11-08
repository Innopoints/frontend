<script>
  import Layout from '@/layouts/default.svelte';
  import Accordion from 'ui/accordion.svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
  import Dot from 'ui/dot.svelte';
  import Dropdown from 'ui/dropdown.svelte';
  import Labeled from 'ui/labeled.svelte';
  import TextField from 'ui/text-field.svelte';
  import FormField from 'ui/form-field.svelte';
  import Switch from 'ui/switch.svelte';
  import RadioGroup from 'ui/radio-group.svelte';
  import CheckboxGroup from 'ui/checkbox-group.svelte';

  const radioItems1 = [
    {
      id: 1,
      label: 'one label',
      color: '#FF0000',
    },
    {
      id: 2,
      label: 'two label',
      color: '#000000',
    },
    {
      id: 3,
      label: 'three label',
      color: '#FFFFFF',
    },
  ];

  const checkboxes = [
    {
      id: 0,
      color: '#FF00FF',
      label: 'one checkbox',
    },
    {
      id: 1,
      color: '#FFFFFF',
      label: 'two checkbox',
    },
    {
      id: 2,
      color: '#000000',
      label: 'two checkbox',
    },
  ];

  const changeCheckbox = (e) => {
    console.log(e.detail);
  };
</script>

<svelte:head>
  <title>UI Showcase – Innopoints</title>

  <!-- Styles for Home page -->
  <link rel="stylesheet" href="css/page-components/footer.css" />
  <link rel="stylesheet" href="css/page-components/header.css" />
  <link rel="stylesheet" href="css/global/ui-kit-page.css" />

  <style>
    .material {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
    }
    .todo {
      background-color: red;
      width: 100%;
    }
    header.top-level { width: 100%; }
    footer { width: 100%; }
  </style>
</svelte:head>

<Layout>
  <Card id="buttons" class="todo">
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
        <svg src="images/icons/flag.svg" class="ml icon" />
      </Button>
      <Button href="#">
        <svg src="images/ui-kit-page/calendar.svg" class="mr icon" />
        button
      </Button>
    </div>
    <div class="showcase">
      <Button round badge>
        <svg src="images/ui-kit-page/bell.svg" />
      </Button>
      <Button round normal>
        <svg src="images/ui-kit-page/x.svg" />
      </Button>
      <Button outline round normal>
        <svg src="images/ui-kit-page/x.svg" />
      </Button>
      <Button filled chevron>chevron</Button>
    </div>
    <hr />
    <div class="showcase">
      <Button filled danger>
        <svg src="images/icons/move.svg" class="mr" />
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
        <svg src="images/innopoint-sharp.svg" class="item" />
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

    <h1>Form field</h1>

    <div class="showcase">
      <form>
        <FormField
            id="ff-1"
            title="Name"
            subtitle="This field is to write the name, so please do."
            required
        >
          <TextField id="ff-1" />
        </FormField>

        <FormField title="Type" subtitle="Write the type here, e.g. sweatshirt" id="ff-2">
          <TextField id="ff-2" />
        </FormField>

        <FormField title="Price" id="ff-3" required>
          <TextField id="ff-3" type="number" placeholder="Price" item right>
            <svg src="images/innopoint-sharp.svg" class="item innopoint" />
          </TextField>
        </FormField>

        <FormField title="Size" id="ff-4" required>
          <TextField id="ff-4" type="number" item>
            <span class="item">XXL</span>
          </TextField>
        </FormField>
      </form>
    </div>

    <hr />

    <div class="showcase">
      <TextField id="nothing" outline label="Label" />
      <TextField
        id="username"
        outline
        item
        label="Telegram"
        pattern="[A-Za-z0-9_](5, 32)"
        error="A username should contain from 5 to 32 symbols: a–z, 0–9, _.">
        <img alt="" src="images/ui-kit-page/at-sign.svg" class="item" />
      </TextField>
    </div>
  </Card>

  <Card id="radios">
    <h1>Radio Buttons</h1>
    <div class="showcase">
      <RadioGroup
          labelClass="radio"
          name="radio0"
          items={radioItems1}
      />
      <hr />

      <RadioGroup
          name="radio1"
          isLabel
          items={radioItems1}
          selected={radioItems1[2]}
      />
      <hr />

      <RadioGroup
          classname="switches"
          name="radio2"
          labelPosition="left"
          isLabel
          isLabelGreen
          items={radioItems1}
      />
      <hr />

      <RadioGroup
          isColor
          labelClass="radio"
          name="radio3"
          items={radioItems1}
      />
    </div>
  </Card>

  <!--todo: checkboxes-->
  <Card id="checkboxes">
    <h1 class="todo">Checkboxes</h1>
    <div class="showcase">
      <CheckboxGroup
          items={checkboxes}
          name="checkbox-1"
          on:change={changeCheckbox}
      />
    </div>
    <div class="showcase">

      <hr />

      <CheckboxGroup
          colored
          items={checkboxes}
          checked={[checkboxes[1]]}
          name="checkbox-2"
          on:change={changeCheckbox}
      />

      <hr />

      <CheckboxGroup
          labeled
          items={checkboxes}
          checked={checkboxes}
          name="checkbox-3"
          on:change={changeCheckbox}
      />
    </div>
  </Card>

  <Card id="switches">
    <h1>Switches</h1>
    <div class="showcase">
      <Switch name="switch-1" id="switch-1" />
      <Switch checked name="switch-2" id="switch-2" />
    </div>

    <hr />
    <div class="showcase">
      <Switch name="withLabel" id="withLabel">Prefixing text</Switch>
    </div>

    <hr />
    <div class="showcase">
      <Switch twoState first="First" second="Second" name="twoStated" id="twoStated" />
    </div>
  </Card>

  <Card id="labeled-elements">
    <h1>Labeled Elements</h1>
    <div class="showcase">
      <Labeled label="Label">
        <span style="font-size: 1.4rem">1000 innopoints</span>
      </Labeled>
      <Labeled icon label="Label">
        <svg
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
      <Dropdown label="open dropdown">
        great now close me
        <br />
        great now close me
        <br />
        great now close me
        <br />
        great now close me
      </Dropdown>
      <Dropdown label="right dropdown" right nowrap>
        <Button filled>woo alRIGHT</Button>
      </Dropdown>
      <Dropdown dropdownclass="info-bubble" btnclass="round" chevron={false} right>
        <svg slot="label" src="images/icons/help-circle.svg" class="icon" />
        Some event organizers prefer to collect those to ease communication.
        Adding one here will save you the typing for those
        occasions (you will still be able to control what you send).
      </Dropdown>
    </div>
  </Card>

  <Card id="accordions">
    <h1>Accordions</h1>
    <div class="showcase">
      <ul class="accordion">
        <li>Not expandable</li>
        <li>
          <Accordion label="expandable">
            Here's some hidden away content
            <br />
            for your great pleasure.
            <Button filled>does nothing</Button>
          </Accordion>
        </li>
        <li>
          <Accordion label="also expandable">
            Here's some hidden away content
            <br />
            for your great pleasure.
            <Button filled>does nothing</Button>
          </Accordion>
        </li>
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

  <!--todo: chips-->
  <Card id="chips">
    <h1 class="todo">Chips</h1>
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
