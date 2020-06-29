<script>
  import { s } from 'attractions/utils';

  export let value = null;
</script>

{#if value != null}
  <div class="balance">
    You have {value}
    <svg src="static/images/innopoint-sharp.svg" alt="innopoint{s(value)}" />
  </div>
{/if}

<style src="../../../static/css/components/products/balance.scss"></style>
