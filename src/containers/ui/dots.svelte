<script>
  import Card from 'ui/card.svelte';
  import Dot from 'ui/dot.svelte';
</script>

<Card id="dots">
  <h1>Dots</h1>
  <div class="showcase vertical">
    <p class="row">
      New information dot
      <Dot pending />
    </p>
    <p class="row" style="font-size: .8rem;">
      Smaller text - smaller dot
      <Dot pending />
    </p>
    <p class="row">
      Artificially smaller dot
      <Dot small pending />
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
