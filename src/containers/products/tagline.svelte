<script>
  import { onMount } from 'svelte';
  import { Button, Dot } from 'attractions';
  import Tagline from 'src/components/common/tagline.svelte';
  import * as api from 'src/utils/api.js';

  export let account;
  let dotShown = false;

  onMount(async () => {
    if (account && account.is_admin) {
      try {
        const purchases = await api.json(api.get('/stock_changes/for_review'));
        dotShown = purchases.length !== 0;
      } catch (e) {
        console.error(e);
      }
    }
  });

  const subhead = (
    'The place where your hard work and proactivity turns into cool merch of Innopolis University.'
  );
</script>

<Tagline
  imageURL="images/products/voxel-trolley.png"
  headline="InnoStore"
  {subhead}
>
  {#if account && account.is_admin}
    <div class="actions">
      <Button outline rectangle href="/products/new">
        <svg src="static/images/icons/plus.svg" class="mr" />
        create new product
      </Button>
      <Button outline rectangle href="/dashboard">
        <svg src="static/images/icons/shopping-bag.svg" class="mr" />
        manage purchases
        {#if dotShown}
          <Dot small class="ml" />
        {/if}
      </Button>
    </div>
  {/if}
</Tagline>
