<script>
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

<Card id="buttons" classname="todo">
  <h1>Buttons</h1>
  <div class="showcase">
    <Button isFilled href="#" away>link</Button>
    <Button isFilled>button</Button>
    <Button isOutline isFilled href="#">link</Button>
    <Button href="#">link</Button>
    <Button isFilled disabled>disabled</Button>
    <Button isOutline disabled>disabled</Button>
    <Button disabled>disabled</Button>
  </div>
  <div class="showcase">
    <Button isFilled>
      button
      <svg src="images/icons/flag.svg" class="ml icon" />
    </Button>
    <Button href="#">
      <svg src="images/icons/calendar.svg" class="mr icon" />
      button
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
  <hr />
  <div class="showcase">
    <Button isFilled isDanger>
      <svg src="images/icons/move.svg" class="mr" />
      button
    </Button>
    <Button href="#" isOutline isDanger>button</Button>
    <Button href="#" isDanger>button</Button>
  </div>
</Card>
