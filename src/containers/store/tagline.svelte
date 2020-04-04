<script>
  import { onMount } from 'svelte';
  import Button from 'ui/button.svelte';
  import Dot from 'ui/dot.svelte';
  import * as api from '@/utils/api.js';

  export let isAdmin;
  let dotShown = false;
  
  onMount(async () => {
    if (isAdmin) {
      try {
        const purchases = await api.json(api.get('/stock_changes/for_review'));
        dotShown = purchases.length !== 0;
      } catch (e) {
        console.error(e);
      }
    }
  });

</script>

<section class="tagline padded">
  <img src="images/store/voxel-trolley.png" class="hide-tb picture" alt="" />
  <div>
    <div class="headline">InnoStore</div>
    <div class="subhead">
      The place where your hard work and proactivity turns into cool merch of
      Innopolis University.
    </div>
    {#if isAdmin}
      <div class="actions">
        <Button isOutline classname="btn rectangle" href="/products/new">
          <svg src="/images/icons/plus.svg" class="icon mr" />
          create new product
        </Button>
        <Button isOutline classname="btn rectangle" href="/dashboard">
          <svg src="/images/icons/shopping-bag.svg" class="icon mr" />
          manage purchases
          {#if dotShown}
            <Dot active small />
          {/if}
        </Button>
      </div>
    {/if}
  </div>
</section>
