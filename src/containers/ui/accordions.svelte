<script>
  import Accordion from 'ui/accordion.svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

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
          <Button isFilled>does nothing</Button>
        </Accordion>
      </li>
      <li>
        <Accordion label="also expandable">
          Here's some hidden away content
          <br />
          for your great pleasure.
          <Button isFilled>does nothing</Button>
        </Accordion>
      </li>
    </ul>
  </div>
</Card>
