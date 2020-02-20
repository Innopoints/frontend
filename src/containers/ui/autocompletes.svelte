<script>
  import Card from 'ui/card.svelte';
  import Autocomplete from 'ui/autocomplete.svelte';
  import getOptions from '@/constants/ui/autocomplete-options.js';

  let selection = [{ name: 'Person Awesome1', details: 'p.awesome1@email.com' }];
</script>

<Card id="autocomplete">
  <h1>Autocomplete</h1>
  <div class="showcase">
    <Autocomplete {getOptions} bind:selection />
    <hr />
    <Autocomplete {getOptions} maxOptions={3} />
  </div>
</Card>
