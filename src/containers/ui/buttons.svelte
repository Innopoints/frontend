<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

<Card id="buttons">
  <h1>Buttons</h1>
  <div class="showcase">
    <Button isFilled>button</Button>
    <Button isOutline>button</Button>
    <Button>button</Button>
  </div>
  <div class="showcase">
    <Button isFilled href="/ui" away>link away</Button>
    <Button isOutline href="/ui">link</Button>
    <Button href="/ui">link</Button>
  </div>
  <div class="showcase">
    <Button isFilled disabled>disabled</Button>
    <Button isOutline disabled>disabled</Button>
    <Button disabled>disabled</Button>
  </div>
  <div class="showcase">
    <Button isFilled>
      icon right
      <svg src="images/icons/flag.svg" class="ml icon" />
    </Button>
    <Button href="#">
      <svg src="images/icons/calendar.svg" class="mr icon" />
      icon left
    </Button>
  </div>
  <div class="showcase">
    <Button isRound badge>
      <svg src="/images/icons/bell.svg" />
    </Button>
    <Button isRound isNormal>
      <svg src="/images/icons/x.svg" />
    </Button>
    <Button isOutline isRound isNormal>
      <svg src="/images/icons/x.svg" />
    </Button>
    <Button isFilled chevron>chevron</Button>
  </div>
  <div class="showcase">
    <Button isFilled isDanger>
      button
    </Button>
    <Button isOutline isDanger>button</Button>
    <Button isDanger>button</Button>
  </div>
  <div class="showcase">
    <Button isRectangle>
      rectangle
    </Button>
    <Button isRectangle isOutline>
      <svg src="/images/icons/bell.svg" class="icon mr" />
      rect
    </Button>
    <Button isRectangle isFilled>
      rect
    </Button>
  </div>
</Card>
