<script>
  import Card from 'ui/card.svelte';
  import Button from 'ui/button.svelte';

  export let m1;
  export let m2;
</script>

<Card id="modals">
  <h1>Modals & Dialogs</h1>
  <div class="showcase vertical">
    <Button on:click={() => m1 = true}>open me</Button>
    <Button on:click={() => m2 = true}>and me</Button>
  </div>
</Card>
