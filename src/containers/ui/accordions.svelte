<script>
  import Accordion from 'ui/accordion.svelte';
  import AccordionSection from 'ui/accordion-section.svelte';
  import Button from 'ui/button.svelte';
  import Card from 'ui/card.svelte';
</script>

<Card id="accordions">
  <h1>Accordions</h1>
  <div class="showcase">
    <Accordion let:panelController={panelController}>
      <li>Not expandable</li>
      <AccordionSection label="expandable" on:panel-open={panelController}>
        Here's some hidden away content
        <br />
        for your great pleasure.
        <Button isFilled>does nothing</Button>
      </AccordionSection>
      <AccordionSection label="also expandable" on:panel-open={panelController}>
        Here's some hidden away content
        <br />
        for your great pleasure.
        <Button isFilled>does nothing</Button>
      </AccordionSection>
    </Accordion>
  </div>
</Card>
