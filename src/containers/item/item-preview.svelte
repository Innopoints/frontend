<script>
  import Button from 'ui/button.svelte';
  import PreviewCard from '@/components/item/preview-card.svelte';
  import {clearAll} from '@/store/item';
</script>

<section class="preview">
  <h2>Preview</h2>
  <PreviewCard />
  <div class="actions">
    <Button isDanger on:click={clearAll}>clear fields</Button>
    <Button isFilled classname="ml btn">create product</Button>
  </div>
</section>
