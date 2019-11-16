<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

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
