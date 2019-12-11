<script>
  import Labeled from 'ui/labeled.svelte';
  import Card from 'ui/card.svelte';
</script>

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
          slot="icon"
      />
      <span style="font-size: 1.4rem">1000 innopoints</span>
    </Labeled>
  </div>
</Card>
