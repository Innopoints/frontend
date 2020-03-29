<script>
  import Popover from 'ui/popover.svelte';
  import Card from 'ui/card.svelte';
</script>

<Card id="popovers">
  <h1>Popovers</h1>
  <Popover>
    <a slot="handle" href="/ui">simple link</a>
    <button slot="popover" class="btn popover">
      <svg src="images/icons/copy.svg" class="icon mr" />
      copy
    </button>
  </Popover>
</Card>
